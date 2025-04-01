require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files (CSS, JS, images) from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Route for homepage
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Import and use school routes
const schoolRoutes = require("./routes/schools");
app.use("/api", schoolRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
