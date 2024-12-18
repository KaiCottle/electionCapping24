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
// decryptPvk: private key
// privateCert: private cert
// idpCert: signature from idp_metadata.xml
// wantAssertionsSigned: must be false
// wantAuthnResponseSigned: must be false
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
    // function to return user email
    function (profile, done) {
        return done(null, {
          email: profile.email,
        });
      }
    )
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
      // Return authenticated user in form of 'req.user'
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

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
}

app.get('/get-user-data', ensureAuthenticated, async (req, res) => {
    try {
        const email = req.user.email; // Get email from authenticated user
        console.log('Querying Faculty table for email:', email);
        
        // Query the Faculty and People tables for the given email, including first and last names
        const facultyResult = await client.query(
            `
            SELECT 
                f.fid, 
                p.Fname AS firstName, 
                p.Lname AS lastName, 
                f.PrefName AS preferredName, 
                f.TheStatement AS serviceStatement, 
                f.SchoolID AS schoolid 
            FROM 
                Faculty f 
            JOIN 
                People p 
            ON 
                f.fid = p.pid 
            WHERE 
                f.Email = $1
            `,
            [email]
        );

        if (facultyResult.rows.length === 0) {
            console.error('Email not found:', email);
            return res.status(404).json({ message: 'Email not found', found: false });
        }

        const faculty = facultyResult.rows[0];
        console.log('Faculty found:', faculty);

        // Query the Schools table for the school name
        console.log('Querying Schools table for SchoolID:', faculty.schoolid);
        const schoolResult = await client.query(
            'SELECT Sname FROM Schools WHERE SID = $1',
            [faculty.schoolid]
        );

        const school = schoolResult.rows.length > 0 ? schoolResult.rows[0].sname : 'Unknown';
        console.log('School found:', school);

        // Query the CommitteeAssignments table for committee IDs
        console.log('Querying CommitteeAssignments table for FID:', faculty.fid);
        const committeeAssignmentsResult = await client.query(
            'SELECT CID FROM CommitteeAssignments WHERE FID = $1',
            [faculty.fid]
        );

        const committeeIds = committeeAssignmentsResult.rows.map(row => row.cid);
        console.log('Committee IDs found:', committeeIds);

        let committees = [];
        if (committeeIds.length > 0) {
            // Query the Committees table for committee names
            console.log('Querying Committees table for Committee IDs:', committeeIds);
            const committeesResult = await client.query(
                'SELECT Cname FROM Committees WHERE CID = ANY($1)',
                [committeeIds]
            );
            committees = committeesResult.rows.map(row => row.cname);
            console.log('Committees found:', committees);
        }

        // Respond with the required data
        res.json({
            found: true,
            firstName: faculty.firstname,
            lastName: faculty.lastname,
            preferredName: faculty.preferredname,
            serviceStatement: faculty.servicestatement,
            school: school,
            committees: committees,
        });
    } catch (error) {
        console.error('Error in /get-user-data:', error);
        res.status(500).json({ message: 'Server error', found: false });
    }
});

// Route to create a new faculty member
app.post('/create-faculty', ensureAuthenticated, async (req, res) => {
    try {
        const { firstName, lastName, preferredName, school, committees, serviceStatement } = req.body;
        const email = req.user.email; // Get email from authenticated user

        // Insert into People table
        const peopleResult = await client.query(
            'INSERT INTO People (Fname, Lname) VALUES ($1, $2) RETURNING PID',
            [firstName, lastName]
        );
        const pid = peopleResult.rows[0].pid;

        // Get School ID and School Name
        const schoolResult = await client.query(
            'SELECT SID, Sname FROM Schools WHERE Sname = $1',
            [school]
        );
        const schoolID = schoolResult.rows[0].sid;
        const schoolName = schoolResult.rows[0].sname;

        // Format the URL
        const formattedSchoolName = schoolName.toLowerCase().replace(/\s+/g, '-');
        const formattedFirstName = firstName.toLowerCase().replace(/\s+/g, '-');
        const formattedLastName = lastName.toLowerCase().replace(/\s+/g, '-');
        const url = `http://www.marist.edu/${formattedSchoolName}/faculty/${formattedFirstName}-${formattedLastName}`;

        // Insert into Faculty table with the formatted URL
        await client.query(
            'INSERT INTO Faculty (FID, Email, SchoolID, IsHidden, PrefName, URL, TheStatement, LastUpdated) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())',
            [
                pid,
                email,
                schoolID,
                false,
                preferredName,
                url,
                serviceStatement
            ]
        );

        // Insert into CommitteeAssignments table
        for (let committeeName of committees) {
            // Get or create Committee ID
            let cid;
            const committeeResult = await client.query(
                'SELECT CID FROM Committees WHERE Cname = $1',
                [committeeName]
            );
            if (committeeResult.rows.length > 0) {
                cid = committeeResult.rows[0].cid;
            } else {
                const newCommittee = await client.query(
                    'INSERT INTO Committees (Cname) VALUES ($1) RETURNING CID',
                    [committeeName]
                );
                cid = newCommittee.rows[0].cid;
            }

            // Insert into CommitteeAssignments
            await client.query(
                'INSERT INTO CommitteeAssignments (FID, CID) VALUES ($1, $2)',
                [pid, cid]
            );
        }

        res.status(200).json({ message: 'Profile created successfully' });
    } catch (error) {
        console.error('Error in /create-faculty:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to edit an existing faculty member
app.put('/edit-faculty', ensureAuthenticated, async (req, res) => {
    try {
        const { firstName, lastName, preferredName, school, committees, serviceStatement } = req.body;
        const email = req.user.email; // Get email from authenticated user

        // Get FID and PID
        const facultyResult = await client.query(
            'SELECT FID FROM Faculty WHERE Email = $1',
            [email]
        );
        if (facultyResult.rows.length === 0) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        const fid = facultyResult.rows[0].fid;

        // Update People table
        await client.query(
            'UPDATE People SET Fname = $1, Lname = $2 WHERE PID = $3',
            [firstName, lastName, fid]
        );

        // Get School ID
        const schoolResult = await client.query(
            'SELECT SID FROM Schools WHERE Sname = $1',
            [school]
        );
        const schoolID = schoolResult.rows[0].sid;

        // Update Faculty table
        await client.query(
            'UPDATE Faculty SET PrefName = $1, SchoolID = $2, TheStatement = $3, LastUpdated = NOW() WHERE FID = $4',
            [preferredName, schoolID, serviceStatement, fid]
        );

        // Update CommitteeAssignments
        await client.query('DELETE FROM CommitteeAssignments WHERE FID = $1', [fid]);
        for (let committeeName of committees) {
            // Get or create Committee ID
            let cid;
            const committeeResult = await client.query(
                'SELECT CID FROM Committees WHERE Cname = $1',
                [committeeName]
            );
            if (committeeResult.rows.length > 0) {
                cid = committeeResult.rows[0].cid;
            } else {
                const newCommittee = await client.query(
                    'INSERT INTO Committees (Cname) VALUES ($1) RETURNING CID',
                    [committeeName]
                );
                cid = newCommittee.rows[0].cid;
            }

            // Insert into CommitteeAssignments
            await client.query(
                'INSERT INTO CommitteeAssignments (FID, CID) VALUES ($1, $2)',
                [fid, cid]
            );
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error in /edit-faculty:', error);
        res.status(500).json({ message: 'Server error' });
    }
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
