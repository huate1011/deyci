const config = require('../config')

module.exports = async ctx => {  
  try {
    var response = await ctx.get('/cgi-bin/token?grant_type=client_credential&appid=wxff42a2142aefae7b' + '&secret=' + '13d6cab12cb6aa2526588cbe40687881', null, {
      'User-Agent': 'koa-http-request'
    });    
    ctx.response.body = {result: response};
    ctx.response.status = 200    
  } catch (err) {
    msg = 'Error: ' + JSON.stringify(err)
    console.log(msg)
    ctx.status = 400
    ctx.type = 'application/json'
    ctx.body = { error: err['sqlMessage'] }
  }
}