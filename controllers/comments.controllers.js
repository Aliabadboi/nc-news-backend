const { selectCommentsByArticleID } = require("../models/comments.models");
const data = require("../endpoints.json")

exports.getCommentsByArticleID = (req, res, next) => {
    const { article_id } = req.params;
    selectCommentsByArticleID(article_id)
    .then((comments) => {
        res.status(200).send({ comments });
    })
    .catch((err) => {
        next(err)
    });
}