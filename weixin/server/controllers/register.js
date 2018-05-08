const { mysql } = require('../qcloud')

module.exports = async ctx => {
//   // 检查签名，确认是微信发出的请求
//   const { signature, timestamp, nonce } = ctx.query
  
//   if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

//   /**
//    * 解析微信发送过来的请求体
//    * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
//    */
  const member = ctx.request.body;
  member['create_time'] = new Date()
  member['last_visit_time'] = new Date()

  // console.log('exeu sql:' + JSON.stringify(member))
  var memberTable = "MemberInfo"
  
  try{
    const res = await mysql(memberTable).insert(member)
    ctx.body = "success"
  } catch (err) {
    msg = 'Error: ' + JSON.stringify(err)
    console.log(msg)
    ctx.body = msg
  }
  
  
  // search
  // const data = await mysql(memberTable).where({ 'phone': member['phone'] }).first()
//   console.log(res)
//   //update
//   await mysql(memberTable).update({ username: "new username" }).where({ id })
//   //search
//   var res = await mysql(memberTable).where({ id }).first()
//   console.log(res)
//   //delete
//   await mysql(memberTable).del().where({ id })
//   //search
//   var res = await mysql(memberTable).where({ id }).first()
//   console.log(res)
}
