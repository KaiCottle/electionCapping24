require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const crypto = require('crypto'); // Import the crypto module
const { client, connectDB } = require('./db/connection'); // Import the client and connectDB
const https = require('https');
const fs = require('fs');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const app = express();

// List of allowed origins
const allowedOrigins = ['https://localhost:3000', 'https://10.11.29.103:3000', 'https://facelect.capping.ecrl.marist.edu:3000'];

// Configure CORS to allow requests from your React app
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json()); // Parse incoming JSON data

// Connect to the PostgreSQL database
connectDB();

// Function to hash passwords using SHA-256
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Passport SAML strategy configuration
passport.use(new SamlStrategy({
    path: '/login/callback',
    entryPoint: 'https://auth.it.marist.edu/idp/profile/SAML2/Redirect/SSO',
    issuer: 'Marist-SSO',
    cert: fs.readFileSync('/var/www/html/backend/sp-cert.pem', 'utf-8'),
    privateCert: fs.readFileSync('/var/www/html/backend/sp-cert.pem', 'utf-8'),
    identifierFormat: null,
    decryptionPvk: fs.readFileSync('/var/www/html/backend/sp-cert.pem', 'utf-8'),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true
}, (profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

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

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// SSO login route
app.get('/login', passport.authenticate('saml', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

// SSO callback route
app.post('/login/callback', passport.authenticate('saml', {
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    res.redirect('/');
});

// Read SSL certificate and key
const options = {
    key: fs.readFileSync('/var/www/html/backend/sp-key.pem'),
    cert: fs.readFileSync('/var/www/html/backend/sp-cert.pem')
};

// Create HTTPS server
https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
});