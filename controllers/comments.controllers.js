const { selectCommentsByArticleID } = require("../models/comments.models");
const data = require("../endpoints.json")
const { selectArticleByID } = require("../models/models")

exports.getCommentsByArticleID = (req, res, next) => {
    const { article_id } = req.params;
    Promise.all([selectArticleByID(article_id), selectCommentsByArticleID(article_id)])
    .then(([article, comments]) => {
        res.status(200).send({ comments });
    })
    .catch((err) => {
        next(err)
    });
}