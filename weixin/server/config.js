const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx3d3ec927e188c534',

    // 微信小程序 App Secret
    appSecret: '1ce3c2023a4667c1546c29575863c047',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    // mysql: {
    //   host: 'localhost',
    //     port: 3306,
    //     user: 'root',
    //     db: 'cAuth',
    //     pass: 'wx3d3ec927e188c534',
    //     char: 'utf8mb4'
    // },
    mysql: {
      host: 'gz-cdb-nc2t3xt8.sql.tencentcdb.com',
      port: 62765,
      user: 'root',
      db: 'cAuth',
      pass: '5Ewn0577',
      char: 'utf8mb4'
    },

    cos: {
        /**
         * 区域
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'miaotest',
        // 文件夹
        uploadFolder: 'test'
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    // 其他配置 ...
    serverHost: 'deyci.deyci.cn',
    tunnelServerUrl: 'https://tunnel.ws.qcloud.la',
    tunnelSignatureKey: 'r2SNuB9gIpen5SS0Us3b1BZCj07vfoUVpuqj3zNL',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1256487243',
    qcloudSecretId: 'AKIDYv3weKIFh05134lsSpytZ1GJPPFvsddP',
    qcloudSecretKey: 'f7JRn46s494pOj8KK8i8MEyXu52441vk',
    wxMessageToken: 'deyci',
    networkTimeout: 30000
}

module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;

