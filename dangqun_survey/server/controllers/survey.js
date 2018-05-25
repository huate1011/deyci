const { mysql } = require('../qcloud')

module.exports = async ctx => {
  //   // 检查签名，确认是微信发出的请求
  //   const { signature, timestamp, nonce } = ctx.query

  //   if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

  //   /**
  //    * 解析微信发送过来的请求体
  //    * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
  //    */  
  const survey = ctx.request.body;
  var surveyTable = survey['surveytype'] 
  var now = new Date();
  survey['create_time'] = now;
  delete survey['surveytype']
  try {
    const res = await mysql(surveyTable).insert(survey)
    ctx.response.status = 200
    ctx.response.body = "提交成功"
  } catch (err) {
    msg = 'Error: ' + JSON.stringify(err)
    console.log(msg)
    ctx.status = 400
    ctx.type = 'application/json'  
    ctx.body = { error: err['sqlMessage'] }    
  }
}
