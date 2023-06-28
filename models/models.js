const db = require("../db/connection.js")

exports.selectTopics = () => {
    return db
    .query(`SELECT * FROM topics`)
    .then((results) => {
        return results.rows;
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
