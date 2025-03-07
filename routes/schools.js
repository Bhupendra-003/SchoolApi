const express = require("express");
const router = express.Router();
const db = require("../db"); // Database connection

router.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required!!' });
    }

    const latitudeNum = parseFloat(latitude);
    const longitudeNum = parseFloat(longitude);

    if (isNaN(latitudeNum) || isNaN(longitudeNum)) {
        return res.status(400).json({ message: 'Latitude and Longitude must be valid numbers!' });
    }

    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(query, [name, address, latitudeNum, longitudeNum], (error, result) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(201).json({ message: 'School Added successfully!', SchoolID: result.insertId });
    });
});

router.get('/listSchools', (req, res) => {
    const { userLatitude, userLongitude } = req.query;

    if (!userLatitude || !userLongitude) {
        return res.status(400).json({ message: "userLatitude and userLongitude are Required" });
    }

    const latitudeNum = parseFloat(userLatitude);
    const longitudeNum = parseFloat(userLongitude);
    console.log(latitudeNum, longitudeNum)

    if (isNaN(latitudeNum) || isNaN(longitudeNum)) {
        return res.status(400).json({ message: 'userLatitude and userLongitude must be valid numbers!' });
    }

    const query = `
        SELECT 
            *, 
            ST_Distance_Sphere(
                POINT(latitude, longitude), 
                POINT(?, ?)
            ) / 1000 AS distance 
        FROM schools 
        ORDER BY distance ASC;
    `;

    db.query(query, [latitudeNum, longitudeNum], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json(result); // Send the already sorted result
    });
});

module.exports = router;