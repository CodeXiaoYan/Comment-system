const Koa = require('koa')
const UseRoutes = require('../router')  //路由安装模块
const bodyParser = require('koa-bodyparser')  //解析JSON
const errhandler = require('./err.handle')   //监听错误处理

const app = new Koa()

app.useRoutes = UseRoutes
app.use(bodyParser())
app.useRoutes()
app.on("error" , errhandler)

module.exports = app