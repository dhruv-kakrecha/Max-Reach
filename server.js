const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/MR-DATA", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/auth", require("./routes/auth"))
app.use("/test", require("./routes/auth"))

// Start Server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000/");
});
