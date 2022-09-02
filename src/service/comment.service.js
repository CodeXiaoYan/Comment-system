const connection = require("../app/database");

class CommentService {
  //回复动态 momentId->>动态的id content->>回复的内容 userId->>用户的id
  async create(momentId, content, userId) {
    const sql = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?)`;
    const result = await connection.execute(sql, [content, momentId, userId]);
    return result[0];
  }
  //回复评论 commentId->> 评论的id
  async reply(momentId, content, userId, commentId) {
    const sql = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?)`;
    const result = await connection.execute(sql, [
      content,
      momentId,
      userId,
      commentId,
    ]);
    return result[0];
  }
}

module.exports = new CommentService();
