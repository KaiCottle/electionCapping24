// Imports the client and connectDB functions from connection.js
const { client, connectDB } = require('./connection');

// ID used in DB query, default -1 (invalid value)
var searchID = -1;

// Sets the id that will be searched for to populate frontend for user
const searchFor = (id) => {
    searchID = id;
}

// Define an asynchronous function to run the query
const runQuery = async () => {
    // Ensure the database is connected before querying
    await connectDB();

    try {
        // Run the SQL query, uses parameterized query placeholder to prevent sql injection. Bracket contains the search value
        const result = await client.query('SELECT * FROM Faculty WHERE Fid = $1', [searchID]);

        // Log the query results
        console.log('Query result:', result.rows);
    } 
    catch (error) {
        console.error('Error executing query:', error.stack);
    } 
    finally {
        // Close the database connection after the query
        await client.end();
    }
};

// Call the function to run the query
runQuery();
