const errType = require("../constants/err.types");
const UserService = require("../service/user.service");
const MD5PASSWORD = require("../utils/password-haddle");
// 注册验证（中间件）
const verifyUser = async (ctx, next) => {
  //获取用户名和密码
  const { username, password, email } = ctx.request.body;
  //验证用户名是否注册
  const result = await UserService.getUserByName(username);
  if (result.length) {
    const error = new Error(errType.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  //验证用户名密码是否为空
  if (!username || !password) {
    const error = new Error(errType.USRT_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  // 验证邮箱是否为空
  if(!email){
    const error = new Error(errType.EMAIL_IS_EMPTY)
    return ctx.app.emit("error",error,ctx)
  }
  //验证密码长度
  const passWordReg = /(^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$)/
  if (!passWordReg.test(password)) {
    const error = new Error(errType.PASSWORD_STRENGTH);
    return ctx.app.emit("error", error, ctx);
  }
   //验证邮箱是否存在
   const emailresult = await UserService.getUserByEmail(email);
   if (emailresult.length) {
     const error = new Error(errType.EMAIL_TO_REPEAT);
     return ctx.app.emit("error", error, ctx);
   }
  //验证是否输入的为邮箱
  const EmailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if(!EmailReg.test(email)){
    const error = new Error(errType.NOT_CORRECT_EMAI)
    return ctx.app.emit('error',error,ctx)
  }
  await next();
};
//秘密MD5加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = MD5PASSWORD(password);
  await next();
};

module.exports = { verifyUser, handlePassword };
