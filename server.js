// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const connectionString = 'postgres://admin:algozzine@10.11.29.103:5432/faculty_elections';

const pool = new Pool({
 connectionString: connectionString,
});

app.get('/faculty', async (req, res) => {
    try {
        const result = await pool.query(`
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});