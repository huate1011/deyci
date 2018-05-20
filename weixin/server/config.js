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
    mysql: {
        host: '172.16.0.4',
        port: 3306,
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
        fileBucket: 'chinaitman',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    // 其他配置 ...
    serverHost: 'xcx.deyci.cn',
    tunnelServerUrl: 'http://tunnel.ws.qcloud.la',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '498318',
    qcloudSecretId: 'AKIDVuAoMmqbmmbEfulwgDYigS2Ys0z5ukHc',
    qcloudSecretKey: 'IPK7mFWbWFm7SfgV8YnpfIjz75rRqhPv',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000
}

module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;

