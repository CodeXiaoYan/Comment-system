const connections = require("../app/database");
//权限查询
class AuthService {
  async checkMoment(momentId, userid) {
    const sql = `SELECT id,user_id FROM moment WHERE id = ? AND user_id = ?`;
    const result = await connections.execute(sql, [momentId, userid]);
    return result[0];
  }
}
module.exports = new AuthService();
