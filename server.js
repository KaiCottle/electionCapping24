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
const bodyParser = require("body-parser");

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
const samlStrategy = new SamlStrategy(
    {
      // Explicitly define the Assertion Consumer Service URL
      callbackUrl: 'https://facelect.capping.ecrl.marist.edulogin/callback',
      path: '/login/callback',
      entryPoint: 'https://auth.it.marist.edu/idp/profile/SAML2/Redirect/SSO',
      issuer: 'https://facelect.capping.ecrl.marist.edu',
      decryptionPvk: fs.readFileSync('./backend/facelect.capping.ecrl.marist.edu.key', 'utf-8'),
      cert: fs.readFileSync('./backend/idp_cert.pem', 'utf-8'),
    },
    (profile, done) => {
        return done(null, profile);
        }
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use('saml', samlStrategy);

// SSO callback route
app.post('/login/callback',
    bodyParser.urlencoded({ extended: false }),
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
const metadata = samlStrategy.generateServiceProviderMetadata({
    decryptionCert: '-----BEGIN CERTIFICATE-----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-----END CERTIFICATE-----',
    issuer: 'https://facelect.capping.ecrl.marist.edu',
    callbackUrl: 'https://facelect.capping.ecrl.marist.edu/login/callback',
});

console.log(metadata);

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
