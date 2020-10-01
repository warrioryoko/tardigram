const pool = require('../utils/pool');

module.exports = class Post {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(rows) {
    this.id = rows.id;
    this.userId = rows.user_id;
    this.photoUrl = rows.photo_url;
    this.caption = rows.caption;
    this.tags = rows.tags;
  }

  static async insert(post) {
    const { rows } = await pool.query(
      'INSERT INTO posts (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [post.userId, post.photoUrl, post.caption, post.tags]
    );

    return new Post(rows[0]);
  }

  static async findPostsByUserId(user) {
    const { rows } = await pool.query(
      'SELECT * FROM posts WHERE user_id=$1',
      [user]
    );

    if(!rows[0]) return null;
    else return new Post(rows[0]);
  }
};
