const db = require("../db/connection.js")

exports.selectCommentsByArticleID = (article_id) => {
    return db
    .query(`SELECT * FROM comments WHERE article_id = $1
    ORDER BY created_at DESC`, [article_id])
    .then((comments) => {
        if(comments.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: "Not found"
            })
        }
        return comments.rows;
    })
}

exports.createCommentByArticleID = () => {
    // needs a parameter 
    // query : insert into (column names) values $1/$2... || %L + [parameters to enter in an array?]
    // error handling? 
    // 404 - correct ID type (number) but resource not found, ergo, cannot post
    // 400 - incorrect ID type, bad request
    // invalid input types for user name and body... malformed post request
    // responds with posted comment ? returning *; ? or something else...
}