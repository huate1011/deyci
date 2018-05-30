/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://jbnnbnam.qcloud.la';


//这个是1、申请的模板消息id，
var template_id = 'nrI4xJ4GLEa_dVg_nfsKNA0_OP1z6_7j5hnRtEbhY6s'

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        template_id,
        // 问卷提交地址
        accessTokenUrl: `${host}/weapp/accessToken`,
        surveyUrl: `${host}/weapp/survey`,
        // 查找公司名字
        companyCheckUrl: `${host}/weapp/companies`,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;