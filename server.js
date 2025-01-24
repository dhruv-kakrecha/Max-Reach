// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(cors());

// app.listen(8000, () => {
//     console.log("server is start now http://localhost:8000");
// })

// app.use("/", require("./routes/appRoutes"));

// app.get('/', (req, res) => {

//     const { name } = req.query
//     res.json({ status: true, message: `welcome ${name || "dhruv"}` });
// })


//server.js

const express = require("express");
const app = express();

app.listen(8000, () => {
    console.log("Server Started at port no. 8000");
})

app.use("/", require("./routes/appRoutes"));
app.use("/user", require("./routes/userRoutes"));

//Mongoose library instance
const mongoose = require('mongoose');
//URL of MongoDB Database
const mongoDBURL = 'mongodb://127.0.0.1:27017';

//connect to Database
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log("Connection Successfull") })
    .catch((err) => { console.log("Received an Error") })
