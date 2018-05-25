const { mysql } = require('../qcloud')

module.exports = async ctx => {
  //   // 检查签名，确认是微信发出的请求
  //   const { signature, timestamp, nonce } = ctx.query

  //   if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

  //   /**
  //    * 解析微信发送过来的请求体
  //    * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
  //    */
  var companyTable = "Companies"  
  const data = await mysql(companyTable).select('name')
  ctx.status = 200
  ctx.type = 'application/json'
  if (data) {
    ctx.body = { result: data }
  } else {
    ctx.body = { result: "" }
  }
}
