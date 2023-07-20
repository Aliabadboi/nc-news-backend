const {
  selectComments,
  selectCommentsByArticleID,
  postComment,
  deleteComment,
} = require('../models/comments.models');
const data = require('../endpoints.json');
const { selectArticleByID } = require('../models/articles.models');

exports.getComments = (req, res, next) => {
  selectComments()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([
    selectArticleByID(article_id),
    selectCommentsByArticleID(article_id),
  ])
    .then(([article, comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addComment = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([
    selectArticleByID(article_id),
    postComment(req.body, article_id),
  ])
    .then(([article, comment]) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.status(204).send('deleted');
    })
    .catch((err) => {
      next(err);
    });
};
