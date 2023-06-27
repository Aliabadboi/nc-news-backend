const db = require("../db/connection.js")

exports.selectTopics = () => {
    return db
    .query(`SELECT * FROM topics`)
    .then((results) => {
        return results.rows;
    });
}

exports.selectArticleByID = (article_id) => {
    const sqlQuery = `SELECT * FROM articles WHERE article_id = $1`
    return db
    .query(sqlQuery, [article_id])
    .then((results) => {
        return results.rows;
    })
}
