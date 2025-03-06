const mysql = require('mysql2')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

try{
    db.connect((err) => { //err: handles asynchronus errors
        if(err){
            console.error("Database connection failed (callback): ", err.stack)
            return;
        }
        console.log("Connected to Mysql Database")
    })
}catch(error){ // to handle synchronus errors like invalid password.
    console.error("Database connection failed: ", error.stack)
}

module.exports = db;