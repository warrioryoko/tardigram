const pool = require('../utils/pool');

module.exports = class Comment {
  id;
  commentBy;
  postId;
  comment;

  constructor(rows) {
    this.id = rows.id;
    this.commentBy = rows.comment_by;
    this.postId = rows.post_id;
    this.comment = rows.comment;
  }

  static async insert(comment) {
    const { rows } = await pool.query(
      'INSERT INTO comments (comment_by, post_id, comment) VALUES ($1, $2, $3) RETURNING *',
      [comment.commentBy, comment.postId, comment.comment]
    );

    return new Comment(rows[0]);
  }

  static async findCOmmentsByUserId(user) {
    const { rows } = await pool.query(
      'SELECT * FROM comments WHERE comment_by=$1',
      [user]
    );

    if(!rows[0]) return null;
    else return new Comment(rows[0]);
  }
};
