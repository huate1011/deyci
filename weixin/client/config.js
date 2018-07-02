/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://deyci.deyci.cn'
// var backup_host = 'https://98qyslge.qcloud.la'
var backup_host = 'https://deyci.deyci.cn'

var config = {
    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        backup_host,

        // 测试的信道服务地址
        registerUrl: `${host}/weapp/register`,
        registerUrlBackup: `${backup_host}/weapp/register`,

        sqlqueryUrl: `${host}/weapp/sqlquery`,
        sqlqueryUrlBackup: `${backup_host}/weapp/sqlquery`,

        // 签名
        signUrl: `${host}/weapp/demo`,
        signUrlBackup: `${backup_host}/weapp/demo`,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,
        loginUrlBackup: `${backup_host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,
        requestUrlBackup: `${backup_host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,
        tunnelUrlBackup: `${backup_host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,
        uploadUrlBackup: `${backup_host}/weapp/upload`
    }
};

module.exports = config;
