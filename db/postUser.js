// Imports the client and connectDB functions from connection.js
const { client, connectDB } = require('./connection');

// Variables used in update statements
var postID = -1;
var postName;
var postStatement;

// Functions that will be used on set variable values based on input from frontend
const postFor = (id) => {
    postID = id;
}
const postName = (name) => {
    postName = name;
}
const postStatement = (statement) => {
    postStatement = statement;
}

// Define an asynchronous function to run the query
const runQuery = async () => {
    // Ensure the database is connected before querying
    await connectDB();

    // This does not account for more committees being added nor a school change
    query = `
      UPDATE Faculty
      SET PrefName = $1, TheStatement = $2, LastUpdated = $3
      WHERE Fid = $4
    `;

    try {
        // Run the SQL query, uses parameterized query placeholder to prevent sql injection. Bracket contains the search value
        const result = await client.query(query, [postName, postStatement, CURRENT_TIMESTAMP, postID]);

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
