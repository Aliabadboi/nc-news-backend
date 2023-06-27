const express = require('express');
const { getTopics, getAPI } = require("./controllers/controllers")


const app = express();

app.get("/api/topics", getTopics);

app.get("/api/", getAPI);

app.get("/api/articles/:article_id", (req, res) => {
    const { article_id } = req.params
    console.log(article_id);
})

// deconstruct from the req body
// pass onto controller/ model
// use model to write a SQL query
// mindful of SQL injection


app.use("*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})


module.exports = app;