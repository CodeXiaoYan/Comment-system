const userService = require("../service/user.service");

class UserController {
  async create(ctx, netx) {
    //获取数据
    const user = ctx.request.body
    //查询数据
    const result = await userService.create(user);
    ctx.body = result;
  }
}
module.exports = new UserController();
