const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

async function post(ctx, next) {
  // 检查签名，确认是微信发出的请求
  const { signature, timestamp, nonce } = ctx.query
  if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

  /**
   * 解析微信发送过来的请求体
   * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
   */
  const body = ctx.request.body

  console.log('exeu sql:' + body)
  // var id = uuid.v1()
  var memberTable = "MemberInfo"
  //add
  var member = {
    uuid: 1,
    username: "bingyuhuozhige"
  }
  await mysql(memberTable).insert(member)
  //search
  var res = await mysql(memberTable).where({ id }).first()
  console.log(res)
  //update
  await mysql(memberTable).update({ username: "new username" }).where({ id })
  //search
  var res = await mysql(memberTable).where({ id }).first()
  console.log(res)
  //delete
  await mysql(memberTable).del().where({ id })
  //search
  var res = await mysql(memberTable).where({ id }).first()
  console.log(res)

  ctx.state.data = {
    msg: 'zheng junfei hello'
  }

  ctx.body = 'success'
}

module.exports = {
  post
}