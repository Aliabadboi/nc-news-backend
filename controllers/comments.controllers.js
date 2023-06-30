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

exports.postCommentByArticleID = (req, res, next) => {
    console.log("hello from controller");
    insertComment(req.body)
    .then((comment) => {
        res.status(201).send({comment});
    })

    // invoke model- naming convention 
    // req.body ?
    // send back via res
}

