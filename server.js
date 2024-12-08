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
const samlStrategy = new SamlStrategy(
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
    (profile, done) => {
        // Extract user information from the profile
        const user = {
            email: profile.emailAddress,
        };
        return done(null, user);
    }
);

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

// Correct route handler with both req and res
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

// Route to get current user's email
app.get('/current-user', ensureAuthenticated, (req, res) => {
    try {
      res.json({ email: req.user.email });
    } catch (err) {
      console.error('Error fetching current user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // New route to fetch faculty by email
  app.get('/faculty-by-email', async (req, res) => {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required' });
    }
  
    try {
      const result = await client.query('SELECT * FROM Faculty WHERE Email = $1', [email]);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching faculty by email:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Route to update user profile
app.post('/update-user-profile', ensureAuthenticated, async (req, res) => {
    const email = req.user.email; // Retrieve email from authenticated user
    const { firstName, lastName, preferredName, school, committees, serviceStatement } = req.body;

    try {
        await client.query('BEGIN');

        // Retrieve FID from Faculty using Email
        const facultyResult = await client.query(
            'SELECT FID FROM Faculty WHERE Email = $1',
            [email]
        );

        if (facultyResult.rows.length === 0) {
            throw new Error('Faculty member not found');
        }

        const fid = facultyResult.rows[0].fid;

        // Retrieve SID from Schools using school name
        const schoolResult = await client.query(
            'SELECT sid FROM Schools WHERE sname = $1',
            [school]
        );

        if (schoolResult.rows.length === 0) {
            throw new Error('School not found');
        }

        const sid = schoolResult.rows[0].sid;

        // Update People table with firstName and lastName
        await client.query(
            `UPDATE People
             SET Fname = $1, Lname = $2
             WHERE PID = $3`,
            [firstName, lastName, fid]
        );

        // Update Faculty table with other profile details and set lastUpdated to current timestamp
        await client.query(
            `UPDATE Faculty
             SET PrefName = $1, SchoolID = $2, ServiceStatement = $3, LastUpdated = NOW()
             WHERE FID = $4`,
            [preferredName, sid, serviceStatement, fid]
        );

        // Assign Committees
        if (Array.isArray(committees) && committees.length > 0) {
            for (const committeeName of committees) {
                // Retrieve CID from Committees table
                const committeeResult = await client.query(
                    'SELECT CID FROM Committees WHERE Cname = $1',
                    [committeeName]
                );

                if (committeeResult.rows.length === 0) {
                    throw new Error(`Committee not found: ${committeeName}`);
                }

                const cid = committeeResult.rows[0].cid;

                // Insert into CommitteeAssignments table without deleting existing assignments
                await client.query(
                    `INSERT INTO CommitteeAssignments (FID, CID)
                     VALUES ($1, $2)
                     ON CONFLICT (FID, CID) DO NOTHING`,
                    [fid, cid]
                );
            }
        }

        await client.query('COMMIT');
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to create user profile
app.post('/create-user-profile', ensureAuthenticated, async (req, res) => {
    const email = req.user.email; // Retrieve email from authenticated user
    const { firstName, lastName, preferredName, school, committees, serviceStatement } = req.body;

    try {
        await client.query('BEGIN');

        // Insert into People table
        const insertPeopleResult = await client.query(
            `INSERT INTO People (Fname, Lname)
             VALUES ($1, $2)
             RETURNING PID`,
            [firstName, lastName]
        );

        const pid = insertPeopleResult.rows[0].pid;

        // Retrieve SID from Schools using school name
        const schoolResult = await client.query(
            'SELECT sid, sname FROM Schools WHERE sname = $1',
            [school]
        );

        if (schoolResult.rows.length === 0) {
            throw new Error('School not found');
        }

        const sid = schoolResult.rows[0].sid;
        const schoolName = schoolResult.rows[0].sname;

        // Hyphenate school name and names for URL
        const hyphenatedSchool = schoolName.toLowerCase().replace(/\s+/g, '-');
        const hyphenatedFirstName = firstName.toLowerCase().replace(/\s+/g, '-');
        const hyphenatedLastName = lastName.toLowerCase().replace(/\s+/g, '-');
        const url = `https://www.marist.edu/${hyphenatedSchool}/faculty/${hyphenatedFirstName}-${hyphenatedLastName}`;

        // Insert into Faculty table without Committees
        await client.query(
            `INSERT INTO Faculty (FID, Email, SchoolID, IsHidden, PrefName, URL, TheStatement, LastUpdated)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
            [pid, email, sid, false, preferredName, url, serviceStatement]
        );

        // Assign Committees
        if (Array.isArray(committees) && committees.length > 0) {
            for (const committeeName of committees) {
                // Retrieve CID from Committees table
                const committeeResult = await client.query(
                    'SELECT CID FROM Committees WHERE Cname = $1',
                    [committeeName]
                );

                if (committeeResult.rows.length === 0) {
                    throw new Error(`Committee not found: ${committeeName}`);
                }

                const cid = committeeResult.rows[0].cid;

                // Insert into CommitteeAssignments table
                await client.query(
                    `INSERT INTO CommitteeAssignments (FID, CID)
                     VALUES ($1, $2)
                     ON CONFLICT (FID, CID) DO NOTHING`,
                    [pid, cid]
                );
            }
        }

        await client.query('COMMIT');
        res.json({ message: 'User profile created successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error creating profile:', err);
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