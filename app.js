const express = require('express');
const { getTopics, getAPI, getArticleByID } = require("./controllers/controllers")


const app = express();

app.get("/api/topics", getTopics);

app.get("/api/", getAPI);

app.get("/api/articles/:article_id", getArticleByID);


app.use((err, req, res, next) => {
    
    if(err.msg) {
        console.log("hello");
        res.status(err.status).send({msg: err.msg})
    }
    else {next(err)}
})

app.use((err, req, res, next) => {
    if(err.code) {
        res.status(400).send({msg: "Bad Request"});
    }
})

app.use("*", (req, res) => {
    res.status(404).send({msg: "Not found"})
})



module.exports = app;


// 404 not working for article id
// 400 bad req 