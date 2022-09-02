const nodemailer = require("nodemailer");
//发送邮件
class SendCodecontroller {
  async SendCode(ctx, next) {
    const { email } = ctx.request.body;
    const config = {
      host: "smtp.qq.com",
      SecureConnection: true,
      port: 465,
      auth: {            
        user: "yik-cap@qq.com",
        pass: "yuudgjtavwcmbjaj", //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
      },
    };
    const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, "0");
    // 创建一个smtp客户端对象
    const transporter = nodemailer.createTransport(config);
    let opctions = {
      // 发件人邮箱
      from: "yik-cap@qq.com",
      // 邮件标题
      subject: "君器商城登录验证码",
      // 目标邮箱
      to: `${email}`,
      // 邮件内容
      html: `<p>您好！</p>
          <p>您的验证码是：<strong style="color:red;">${code}</strong></p>
          <p>如果不是您本人操作，请无视此邮件!</p>`,
    };
    transporter.sendMail(opctions, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`往${email}发送邮箱成功`);
        transporter.close();
      }
    });
    ctx.body = `邮件发送成功,你的验证码为${code}`;
  }
}
module.exports = new SendCodecontroller();
