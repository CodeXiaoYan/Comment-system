const connection = require("../app/database");
class UserService {
  // 用户注册
  async create(user) {
    const { username, password, email } = user;
    const statement = `INSERT INTO users (name , password , email) VALUES (?,?,?);`;
    const result = await connection.execute(statement, [
      username,
      password,
      email,
    ]);
    return result[0];
  }
  //查询用户名是否重复
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  //查询邮箱是否注册
  async getUserByEmail(email) {
    const statement = `SELECT * FROM users WHERE email = ?`;
    const result = await connection.execute(statement, [email]);
    return result[0];
  }
  //查询邮箱是否为用户注册邮箱(登录)
  async getUserByEmailOrName(email, name) {
    const statement = `SELECT * FROM users WHERE  email = ? and name = ?`;
    const result = await connection.execute(statement, [email, name]);
    return result[0];
  }
}
module.exports = new UserService();
