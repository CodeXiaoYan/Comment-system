const Router = require("koa-router");
const ComentRouter = new Router({
  prefix: "/comment",
});
const { create,reply } = require("../controller/commnet.controller");
const { verifyAuth } = require("../middleware/login.middleware");
//发布评论
ComentRouter.post("/", verifyAuth, create);
//回复评论
ComentRouter.post("/reply/:commentId",verifyAuth,reply)

module.exports = ComentRouter;
