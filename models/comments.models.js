const db = require("../db/connection.js")

exports.selectCommentsByArticleID = (article_id) => {
    return db
        .query(`SELECT * FROM comments WHERE article_id = $1
        ORDER BY created_at DESC`, [article_id])
        .then((comments) => comments.rows)
}

exports.postComment = (newComment, article_id) => {
    const { body, username} = newComment;
    return db
        .query(`INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;`, 
        [body, username, article_id])
        .then(({ rows }) => rows[0]
    )
}
