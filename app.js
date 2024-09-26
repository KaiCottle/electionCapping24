// app.js
const { connectDB } = require('./db/connection'); // Import the connectDB function

// Connect to the database
const startApp = async () => {
  await connectDB(); // Connect to the PostgreSQL database
  
  console.log('App is running');
};

startApp();
