require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto'); // Import the crypto module
const { client, connectDB } = require('./db/connection'); // Import the client and connectDB
const http = require('http');
const https = require('https');
const fs = require('fs');
const passport = require('passport');
const SamlStrategy = require('@node-saml/passport-saml').Strategy;
const session = require('express-session');
const bodyParser = require("body-parser");
const morgan = require('morgan'); 

const httpPort = 80;
const httpsPort = 443;

const app = express();

// List of allowed origins
const allowedOrigins = [
    'https://facelect.capping.ecrl.marist.edu',
    'https://api-a1cc77df.duosecurity.com',
    'https://auth.it.marist.edu',
];

app.use(cors());
app.use(express.json()); // Parse incoming JSON data
app.use(morgan('common')); // Log HTTP requests

// Connect to the PostgreSQL database
connectDB();

// Configure session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Ensure cookies are only used over HTTPS in production
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Function to hash passwords using SHA-256
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Passport SAML strategy configuration
passport.use(new SamlStrategy(
    {
      callbackUrl: 'https://facelect.capping.ecrl.marist.edu/login/callback',
      entryPoint: 'https://auth.it.marist.edu/idp/profile/SAML2/Redirect/SSO',
      issuer: 'https://facelect.capping.ecrl.marist.edu',
      decryptionPvk: fs.readFileSync('./backend/facelect.capping.ecrl.marist.edu.pem', 'utf-8'),
      privateCert: fs.readFileSync('./backend/2024_facelect.capping.ecrl.marist.edu.pem', 'utf-8'),
      idpCert: fs.readFileSync('./backend/idp_cert.pem', 'utf-8'),
      wantAssertionsSigned: false,
      wantAuthnResponseSigned: false
    },
    function (profile, done) {
        return done(null, {
          email: profile.email,
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// SSO callback route
app.post(
  '/login/callback',
  bodyParser.urlencoded({ extended: false }),
  passport.authenticate("saml", {
    failureRedirect: "/",
    failureFlash: true,
  }),
  function (req, res) {
    // Access the authenticated user
    console.log("req.user");
    console.log(req.user);
    res.redirect("/user-profile");
  }
);

// SSO login route
app.get('/sso/login', 
    passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
    function (req, res) {
        res.redirect("/");
    }
);

// Route to fetch committee names
app.get('/committees', async (req, res) => {
    try {
      const result = await client.query('SELECT Cname FROM Committees');
      console.log('Fetched committees:', result.rows); // Add this line to log the fetched data
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching committees:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Route to fetch school names
app.get('/schools', async (req, res) => {
    try {
        const result = await client.query('SELECT Sname FROM Schools');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching schools:', err);
        res.status(500).json({ message: 'Server error' });
    }
  }
);

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

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler to serve React's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Read SSL certificate and key
const options = {
    key: fs.readFileSync('./backend/facelect.capping.ecrl.marist.edu.pem'),
    cert: fs.readFileSync('./backend/2024_facelect.capping.ecrl.marist.edu.pem'),
    ca: fs.readFileSync('./backend/2024_InCommonCA.crt'),
};

// create servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

// start servers
httpServer.listen(httpPort, () => {
    console.log(`HTTP Server running on port ${httpPort}`);
});
httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS Server running on port ${httpsPort}`);
});
