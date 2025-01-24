const express = require('express');
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