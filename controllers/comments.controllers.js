const { selectCommentsByArticleID, postComment } = require("../models/comments.models");
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

exports.addComment = (req, res, next) => {
    const { article_id } = req.params;
    Promise.all([selectArticleByID(article_id), postComment(req.body, article_id)])
    .then(([article, comment]) => {
        res.status(201).send({comment});
    })
    .catch((err) => {
        console.log(err);
        next(err)
    });
}