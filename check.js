require('dotenv').config(); // Load environment variables
const { client } = require('./db/connection'); // Import the PostgreSQL client from connection.js

// Hardcoded admin username to check
const adminUsernameToCheck = 'admin1'; // Change this to the username you want to check

const checkAdminExists = async (username) => {
    try {
        await client.connect(); // Connect to the database
        const result = await client.query('SELECT * FROM Admins WHERE Uname = $1', [username]); // Query to check for the username

        // Check if the admin exists in the result
        if (result.rows.length > 0) {
            console.log(true); // Username exists
        } else {
            console.log(false); // Username does not exist
        }
    } catch (err) {
        console.error('Error checking admin existence:', err);
    } finally {
        await client.end(); // Close the database connection
    }
};

// Call the function with the hardcoded username
checkAdminExists(adminUsernameToCheck);