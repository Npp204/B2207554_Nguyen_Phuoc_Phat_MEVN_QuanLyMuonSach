const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use (express.json());

app.get("/", (req, res) => {
    res.send("Welcome to contact book application.");
});


module.exports = app;