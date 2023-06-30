const { selectTopics, selectArticleByID, selectArticles } = require("../models/models");
const data = require("../endpoints.json");
const articles = require("../db/data/test-data/articles");

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch(next);
}

exports.getAPI = (req, res) => {
    res.status(200).send(data);
}

exports.getArticleByID = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleByID(article_id)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch((err) => {
        next(err)
    });
}

exports.getArticles = (req, res) => {
    selectArticles()
    .then((articles) => {
    res.status(200).send({ articles });
})} 