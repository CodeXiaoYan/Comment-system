const errTypes = require("../constants/err.types");
const errhandle = (error, ctx) => {
  let message, status;
  switch (error.message) {
    case errTypes.USRT_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空~";
      break;
    case errTypes.EMAIL_IS_EMPTY:
      status = 400;
      message = "邮箱不能为空~";
      break;
    case errTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "该用户名已注册,请重新输入~";
      break;
    case errTypes.EMAIL_TO_REPEAT:
      status = 409;
      message = "该邮箱已注册,请重新输入~";
      break;
    case errTypes.PASSWORD_STRENGTH:
      status = 409;
      message = "密码必须由字母、数字组成且必须是8-18位~";
      break;
    case errTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户名不存在,请检查用户名是否正确~";
      break;
    case errTypes.NOT_CORRECT_EMAI:
      status = 400;
      message = "请输入正确的邮箱~";
      break;
    case errTypes.NOT_REGISTERED_EMAIL:
      status = 400;
      message = "请更换为注册邮箱进行登录~";
      break;
    case errTypes.PASSWORD_MISTAKE:
      status = 400;
      message = "密码错误,请检查密码是否正确~";
      break;
    case errTypes.UNAUTHORIZED:
      status = 401;
      message = "未授权,token过期~";
      break;
    case errTypes.HAVE_NO_RIGHT:
      status = 401;
      message = "不具备修改权限~";
      break;
    default:
      status = 404;
      message = "NOT FOUND~";
  }
  ctx.status = status;
  ctx.body = message;
};
module.exports = errhandle;
