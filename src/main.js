const app = require('./app') 
const config = require('./app/config') //获取.env文件

app.listen(config.APP_PORT, () => {
    console.log(`服务器在${config.APP_PORT}端口启动成功`);
})