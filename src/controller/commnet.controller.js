const CommentService = require("../service/comment.service")
class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await CommentService.create(momentId,content,id)
    ctx.body = "发布评论成功"
  }
  async reply(ctx,next){
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params
    const { id,name } = ctx.user;
    const res = await CommentService.reply(momentId,content,id,commentId)
    ctx.body = `用户${name}回复第${momentId}条评论成功`
  }
}

module.exports = new CommentController();
