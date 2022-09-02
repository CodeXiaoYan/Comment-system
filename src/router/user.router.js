const Router = require("koa-router");
const UserRouter = new Router({
  prefix: "/user",
});
const { create } = require("../controller/user.controller");
//用户验证中间件
const { verifyUser,handlePassword } = require('../middleware/user.middleware')
//发送验证码
const { SendCode } = require('../controller/sendcode.controller')
UserRouter.post("/", verifyUser , handlePassword , create);
UserRouter.post("/sendcode",SendCode)

module.exports = UserRouter;
