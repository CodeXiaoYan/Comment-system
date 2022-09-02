const Router = require("koa-router");
const MomentRouter = new Router({
  prefix: "/moment",
});
const { verifyAuth,verifyPermission } = require("../middleware/login.middleware");
const { create, detail, list, update, remove } = require("../controller/moment.controller");
//增加一条动态
MomentRouter.post("/", verifyAuth, create);
//获取一条动态
MomentRouter.get("/:momentId", detail);
//获取动态列表并分页
MomentRouter.get("/", list);
//验证是否登录--->验证是否具备权限修改--->动态更新
MomentRouter.patch("/:momentId", verifyAuth, verifyPermission, update)
//删除动态
MomentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove)
module.exports = MomentRouter;
