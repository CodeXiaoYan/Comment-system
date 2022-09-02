const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
class LoginController {
  async login(ctx, next) {
    const { email } = ctx.request.body;
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.body = { id, name, token, email };
  }

  async success(ctx, next) {
    console.log(ctx.user)
    ctx.body = "授权成功~" + "您的用户名为" + ctx.user.name;
  }
}
module.exports = new LoginController();
