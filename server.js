require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

const schoolRoutes = require("./routes/schools");
app.use("/api", schoolRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});