const config = require('../config')
const https = require('https')
const request = require('request')

module.exports = async ctx => {  
  try {    
    var response = await ctx.get('/cgi-bin/token?grant_type=client_credential&appid=' + config.appId + '&secret=' + config.appSecret, null, {
      'User-Agent': 'koa-http-request'
    });
    
    request.post(      'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + JSON.parse(response).access_token,
      { json: ctx.request.body},
      function (response, body) { 
        console.log(body.body.errmsg)        
      }
    );    
  } catch (err) {
    msg = 'Error: ' + JSON.stringify(err)
    console.log(msg)
    ctx.status = 400
    ctx.type = 'application/json'
    ctx.body = { error: err['sqlMessage'] }
  }
}