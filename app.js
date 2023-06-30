const express = require('express');
const { getTopics, getAPI, getArticleByID, getArticles } = require("./controllers/controllers")
const { handlePsqlErrors, handleCustomErrors, handleServerErrors } = require("./errors");
const { getCommentsByArticleID, addCommentByArticleID } = require("./controllers/comments.controllers");


const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/", getAPI);

app.get("/api/articles/:article_id", getArticleByID);

app.get("/api/articles/:article_id/comments", getCommentsByArticleID);
app.get("/api/articles", getArticles);


app.post("/api/articles/:article_id/comments", addCommentByArticleID);

app.all("*", (_, res) => {
    res.status(404).send({ msg: "Not found" });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);


module.exports = app;