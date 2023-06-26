const express = require('express');
const { getTopics } = require("./controllers/controllers")

const app = express();

app.get("/api/topics", getTopics);

app.use("*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})


module.exports = app;