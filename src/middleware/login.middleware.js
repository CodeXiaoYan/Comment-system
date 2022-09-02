const errType = require("../constants/err.types");
const UserService = require("../service/user.service");
const AuthService = require("../service/auth.service")
const jwt = require("jsonwebtoken");
const MD5PASSWORD = require("../utils/password-haddle");
const { PUBLIC_KEY } = require("../app/config");
const verifyLogin = async (ctx, next) => {
  //获取用户名密码
  const { username, password, email } = ctx.request.body;
  //验证用户名和密码是否为空
  if (!username || !password) {
    const error = new Error(errType.USRT_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //验证邮箱是否为空
  if (!email) {
    const error = new Error(errType.EMAIL_IS_EMPTY);
    return ctx.app.emit("error", error, ctx);
  }
  //验证用户名是否存在
  const result = await UserService.getUserByName(username);
  const user = result[0];
  if (!user) {
    const error = new Error(errType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  //验证邮箱是否为该用户注册邮箱
  const email_result = await UserService.getUserByEmailOrName(email,username);
  if (!email_result[0]) {
    const error = new Error(errType.NOT_REGISTERED_EMAIL);
    return ctx.app.emit("error", error, ctx);
  }
  //验证密码是否正确
  if (MD5PASSWORD(password) !== user.password) {
    const error = new Error(errType.PASSWORD_MISTAKE);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;
  await next();
};
//授权认证
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errType.UNAUTHORIZED);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (error) {
    error = new Error(errType.UNAUTHORIZED);
    return ctx.app.emit("error", error, ctx);
  }
};
const verifyPermission = async (ctx,next) =>{
  const { momentId } =ctx.params
  const { id } = ctx.user
  const result = await AuthService.checkMoment(momentId,id)
  if(!result.length){
    const error = new Error(errType.HAVE_NO_RIGHT)
    return ctx.app.emit("error",error,ctx)
  }
  await next()
}

module.exports = { verifyLogin, verifyAuth,verifyPermission };
