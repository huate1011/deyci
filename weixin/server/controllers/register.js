const { mysql } = require('../qcloud')

async function getVolunteerID(tableName, gender) {
  var midnight = new Date()
  midnight.setHours(0);
  midnight.setMinutes(0);
  midnight.setSeconds(0)
  var existingid = null
  try {
    const data = await mysql(tableName).max('volunteerid').where('last_visit_time', '>', midnight).first();
    existingid = data['max(`volunteerid`)']
  } catch (err) {
    console.log(msg)    
  }
  if (existingid === null) {
    return midnight.getFullYear() * 100000000 + (midnight.getMonth() + 1) * 1000000 +
    midnight.getDate() * 10000 + 10 + gender;
  } else {
    return existingid - existingid % 10 + 10 + gender;
  }
}

module.exports = async ctx => {
//   // 检查签名，确认是微信发出的请求
//   const { signature, timestamp, nonce } = ctx.query
  
//   if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

//   /**
//    * 解析微信发送过来的请求体
//    * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
//    */
  var memberTable = "MemberInfo"
  const member = ctx.request.body;
  // Try to set the volunteer id
  var now = new Date();  
  
  member['create_time'] = now;
  member['last_visit_time'] = now  
  member['volunteerid'] = await getVolunteerID(memberTable, member['gender'] === 'Female'? 2 : 1)
  // console.log('exeu sql:' + JSON.stringify(member))
  try{
    const res = await mysql(memberTable).insert(member)
    ctx.response.status = 200
    ctx.response.body = "注册成功" + member['volunteerid']
  } catch (err) {
    msg = 'Error: ' + JSON.stringify(err)
    console.log(msg)
    ctx.status = 400
    ctx.type = 'application/json'
    ctx.body = ''
    if (err['code'] == 'ER_DUP_ENTRY') {
      if (err['sqlMessage'].indexOf('phone') > -1) {
        ctx.body = {error:"电话号码已被使用"}
      } else if (err['sqlMessage'].indexOf('personalid') > -1) {
        ctx.body = {error: "身份证号已被使用"}
      }
    }
    if (ctx.body == '') {
      ctx.body = {error: err['sqlMessage']}
    }  
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
