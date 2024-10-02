require('dotenv').config();

const { Client } = require('pg');

//Pull credentials from .env file so that they are not uploaded onto github
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

//Simple connection string, just use this to test connection
const connectDB = async () => {
    try {
      await client.connect();
      console.log('Connected to PostgreSQL database');
    } catch (error) {
      console.error('Database connection error:', error.stack);
    }
};
  
module.exports = {
    client,
    connectDB,
  };