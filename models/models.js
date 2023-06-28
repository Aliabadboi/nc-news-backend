const db = require("../db/connection.js")

exports.selectTopics = () => {
    return db
    .query(`SELECT * FROM topics`)
    .then((results) => {
        return results.rows;
    });
}

exports.selectArticleByID = (article_id) => {
    const sqlQuery = `SELECT * FROM articles WHERE article_id = $1;`;
    return db
    .query(sqlQuery, [article_id])
    .then((article) => {
        console.log(article);
        if(article.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: "Not found"
            })
        }
        return article.rows;
    })
}
