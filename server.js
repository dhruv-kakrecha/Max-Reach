const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());

app.listen(8000, () => {
    console.log("server is start now http://localhost:8000");
})

app.use("/", require("./routes/appRoutes"));

app.get('/', (req, res) => {

    const { name } = req.query
    res.json({ status: true, message: `welcome ${name || "dhruv"}` });
})