const db = require("../db/connection.js")

exports.selectTopics = () => {
    return db
    .query(`SELECT * FROM topics`)
    .then((topics) => {
        return topics.rows;
    });
}

exports.selectArticleByID = (article_id) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((article) => {
        if(article.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: "Not found"
            })
        }
        return article.rows;
    })
}

exports.selectArticles = () => {
    return db
    .query(`
    SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC;`)
    .then(({rows}) => {
        return rows
    })
}