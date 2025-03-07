const express = require("express");
const router = express.Router();
const db = require("../db"); // Database connection

// Haversine formula function
function haversine(lat1, lon1, lat2, lon2) {
    const toRad = angle => (angle * Math.PI) / 180;

    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Add School API
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

// List Schools API (Using Haversine)
router.get('/listSchools', (req, res) => {
    const { userLatitude, userLongitude } = req.query;

    if (!userLatitude || !userLongitude) {
        return res.status(400).json({ message: "userLatitude and userLongitude are Required" });
    }

    const latitudeNum = parseFloat(userLatitude);
    const longitudeNum = parseFloat(userLongitude);

    if (isNaN(latitudeNum) || isNaN(longitudeNum)) {
        return res.status(400).json({ message: 'userLatitude and userLongitude must be valid numbers!' });
    }

    // Fetch all schools
    const query = "SELECT id, name, address, latitude, longitude FROM schools";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        // Calculate distances and add to the results
        const schoolsWithDistance = result.map((school) => {
            const distance = haversine(latitudeNum, longitudeNum, school.latitude, school.longitude);
            return { ...school, distance };
        });

        // Sort by distance
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    });
});

module.exports = router;