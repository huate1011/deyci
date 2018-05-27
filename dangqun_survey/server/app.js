const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('./middlewares/bodyparser')
const config = require('./config')
const koaRequest = require('koa-http-request')

// 使用响应处理中间件
app.use(response)
app.use(koaRequest({  
  timeout: 3000,    //3s timeout
  host: 'https://api.weixin.qq.com'
}))

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
