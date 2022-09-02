const MomentService = require("../service/moment.service");
class Momentcontroller {
  async create(ctx, next) {
    //获取数据
    const userid = ctx.user.id;
    const content = ctx.request.body.content;
    //插入数据
    const result = await MomentService.create(userid, content);
    ctx.body = result;
  }
  async detail(ctx, next) {
    //通过ctx.params拿到momentId
    const momentId = ctx.params.momentId;
    //查询单条数据
    const result = await MomentService.getMomentById(momentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    //获取数据
    const { offset, size } = ctx.query;
    //查询列表
    const result = await MomentService.getMonentByList(offset, size);
    ctx.body = result;
  }
  //修改内容
  async update(ctx, next) {
    const { content } = ctx.request.body;
    const { momentId } = ctx.params;
    //更具用户id修改内容
    await MomentService.updateContent(content,momentId)
    ctx.body = "数据修改成功"
  }
  async remove(ctx,next){
    const { momentId } = ctx.params
    const result = await MomentService.remove(momentId)
    ctx.body = "数据删除成功"
  }
}
module.exports = new Momentcontroller();
