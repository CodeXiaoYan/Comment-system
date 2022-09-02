const Router = require("koa-router");

const LoginRouter = new Router({
  prefix: "/login",
});

const { login , success } = require('../controller/login.controller.js')
const { verifyLogin,verifyAuth } = require('../middleware/login.middleware')

LoginRouter.post("/", verifyLogin , login);

LoginRouter.get('/test', verifyAuth, success);

module.exports = LoginRouter