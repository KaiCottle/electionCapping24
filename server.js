require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const crypto = require('crypto'); // Import the crypto module
const { client, connectDB } = require('./db/connection'); // Import the client and connectDB
const https = require('https');
const fs = require('fs');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const session = require('express-session');

const app = express();

// List of allowed origins
const allowedOrigins = [
    'https://facelect.capping.ecrl.marist.edu',
    'https://api-a1cc77df.duosecurity.com',
    'https://auth.it.marist.edu',
];

app.use(cors());

app.use(express.json()); // Parse incoming JSON data

// Configure session middleware
app.use(session({
    secret: 'Faculty%Defeat$248902', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Ensure cookies are only used over HTTPS in production
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Connect to the PostgreSQL database
connectDB();

// Function to hash passwords using SHA-256
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

var spKey = fs.readFileSync('./backend/facelect.capping.ecrl.marist.edu.key', 'utf-8');
var spCert = fs.readFileSync('./backend/2024_facelect.capping.ecrl.marist.edu.crt', 'utf-8');
var idpCert = fs.readFileSync('./backend/idp_cert.pem', 'utf-8');

// Passport SAML strategy configuration
passport.use(new SamlStrategy(
    {
      // Explicitly define the Assertion Consumer Service URL
      callbackUrl: 'https://facelect.capping.ecrl.marist.edulogin/callback',
      path: '/login/callback',
      entryPoint: 'https://auth.it.marist.edu/idp/profile/SAML2/Redirect/SSO',
      issuer: 'https://facelect.capping.ecrl.marist.edu',
      decryptionPvk: spKey,
      cert: idpCert,
    },
    function(profile, done) {
        console.log('SAML Profile:', profile);
        findByEmail(profile.email, (err, user) => {
            if (err) {
                console.error('Error in SAML callback:', err);
                return done(err);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use('saml', SamlStrategy);

// SSO callback route
app.post('/login/callback', 
    passport.authenticate('saml', {
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    res.redirect('/user-profile');
});

// SSO login route
app.get('/sso/login', passport.authenticate('saml', {
    successRedirect: '/user-profile',
    failureRedirect: '/login'
}));

// Route to serve SP metadata
const metadata = SamlStrategy.generateServiceProviderMetadata({
    cert: spCert,
    key: spKey,
    issuer: 'https://facelect.capping.ecrl.marist.edu',
    callbackUrl: 'https://facelect.capping.ecrl.marist.edu/login/callback',
});

app.get('/metadata', (req, res) => {
    const decryptionCert = spCert;
    res.type('application/xml');
    res.send (metadata)
});

// Route to handle admin login
app.post('/admin-login', async (req, res) => {
    const { username, password } = req.body; // Capture username and password from request

    try {
        // Query the Admins table to find the admin by username (Uname)
        const adminResult = await client.query('SELECT * FROM Admins WHERE Uname = $1', [username]);

        if (adminResult.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const admin = adminResult.rows[0];

        // Hash the provided password and compare with the stored hash
        const hashedInputPassword = hashPassword(password); // Hash the input password
        if (hashedInputPassword !== admin.thepassword) { // Use correct case for ThePassword
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // If successful, return a success message (can also return user data if needed)
        res.json({ message: 'Login successful', admin: { AID: admin.AID, Uname: admin.Uname, Godmode: admin.Godmode } });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Example existing route for fetching faculty data (unchanged)
app.get('/faculty', async (req, res) => {
    try {
        const result = await client.query(` 
            SELECT 
                faculty.fid,
                faculty.email,
                faculty.ishidden,
                faculty.prefname,
                faculty.url,
                faculty.thestatement,
                faculty.lastupdated,
                schools.sname AS sname
            FROM faculty
            LEFT JOIN schools ON faculty.schoolid = schools.sid;
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error querying the database');
    }
});

// Read SSL certificate and key
const options = {
    key: fs.readFileSync('./backend/facelect.capping.ecrl.marist.edu.key'),
    cert: fs.readFileSync('./backend/2024_facelect.capping.ecrl.marist.edu.crt'),
    ca: fs.readFileSync('./backend/2024_InCommonCA.crt'),
};

// Create HTTPS server on port 3001
https.createServer(options, app).listen(3001, () => {
    console.log('HTTPS Server running on port 3001');
});
