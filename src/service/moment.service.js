const connection = require("../app/database");
//抽离数据库查询语句片段
const sqlfragment = `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updatetime,
JSON_OBJECT('id',u.id,'name',u.name) utterer
FROM moment m LEFT JOIN users u ON m.user_id = u.id`;

class MomentService {
  async create(userid, content) {
    //插入动态语句
      const sql = `INSERT INTO moment (content,user_id) VALUES (?,?)`;
      const [result] = await connection.execute(sql, [content,userid]);
      return result;
  }
  //查询单条数据
  async getMomentById(id) {
    const sql = `${sqlfragment} WHERE m.id = ?`;
    const [result] = await connection.execute(sql, [id]);
    return result;
  }
  //查询多条数据
  async getMonentByList(offset, size) {
    const sql = `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updatetime,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
    JSON_OBJECT('id',u.id,'name',u.name) release_user
    FROM moment m LEFT JOIN users u ON m.user_id = u.id LIMIT ?,?`;
    const [result] = await connection.execute(sql, [offset, size]);
    return result;
  }
  //修改数据
  async updateContent(content,momentId){
    const sql = `UPDATE moment SET content = ? WHERE id = ?`
    const result = await connection.execute(sql,[content,momentId])
    return result[0]
  }
  //删除数据
  async remove(momentId){
    const sql = `DELETE FROM moment WHERE id = ?`
    const result = await connection.execute(sql,[momentId])
    return result[0]
  }
}

module.exports = new MomentService();
