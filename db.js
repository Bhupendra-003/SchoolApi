const mysql = require('mysql2');
const fs = require('fs'); // For reading the CA certificate

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Add port from environment variables
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

try {
    db.connect((err) => {
        if (err) {
            console.error("Database connection failed (callback): ", err); // Removed .stack for cleaner error message
            return;
        }
        console.log("Connected to MySQL Database");
    });
} catch (error) {
    console.error("Database connection failed (sync): ", error); // Removed .stack for cleaner error message
}

module.exports = db;