'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem',
    caBundle: './config/sslcerts/cabundle.crt'
  },
  mongodb: {
    promise: global.Promise,
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost:27017') + '/mean_dev',
    options: {user:'mean', pass:'miaologic'},
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  mysql: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password : 'newpassword',
      database : 'cAuth',
      charset: 'utf8mb4',
      multipleStatements: true
    },
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds'
    }
  },
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    username: '@TWITTER_USERNAME',
    clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
    clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || 'APP_ID',
    clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID || 'CLIENT_ID',
    clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: true
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  },
  livereload: true,
  seedDB: {
    seed: true,
    options: {
      logResults: process.env.MONGO_SEED_LOG_RESULTS !== 'false'
    },
    // Order of collections in configuration will determine order of seeding.
    // i.e. given these settings, the User seeds will be complete before
    // Article seed is performed.
    collections: [{
      model: 'User',
      docs: [{
        data: {
          username: 'local-admin',
          email: 'admin@localhost.com',
          firstName: 'Admin',
          lastName: 'Local',
          roles: ['admin', 'user']
        }
      }, {
        // Set to true to overwrite this document
        // when it already exists in the collection.
        // If set to false, or missing, the seed operation
        // will skip this document to avoid overwriting it.
        overwrite: true,
        data: {
          username: 'local-user',
          email: 'user@localhost.com',
          firstName: 'User',
          lastName: 'Local',
          roles: ['user']
        }
      }]
    }, {
      model: 'Article',
      options: {
        // Override log results setting at the
        // collection level.
        logResults: true
      },
      skip: {
        // Skip collection when this query returns results.
        // e.g. {}: Only seeds collection when it is empty.
        when: {} // Mongoose qualified query
      },
      docs: [{
        data: {
          title: 'First Article',
          content: 'This is a seeded Article for the development environment'
        }
      }]
    } , {
      model: 'Form',
      options: {
        // Override log results setting at the
        // collection level.
        logResults: true
      },
      skip: {
        // Skip collection when this query returns results.
        // e.g. {}: Only seeds collection when it is empty.
        when: {} // Mongoose qualified query
      },
      docs: [{
        data: {
          title: 'PersonalSurveys',
          content: JSON.stringify([
      {
        "question": "您更愿意在活动中承担的角色: (单选)",
        "name": "角色承担",
        "index": 0,
        "size":4,
        "items": [
          { "value": "参与者", "name": "参与者" },
          { "value": "策划者", "name": "策划者" },
          { "value": "传播者", "name": "传播者" },
          { "value": "组织者", "name": "组织者" }
        ]
      },
      {
        "question": "您喜欢的活动领域: (多选)",
        "name": "喜好类型",
        "index": 1,
        "size": 4,
        "items": [
          { "value": "学习培训类", "name": "学习培训类" },
          { "value": "社交活动类", "name": "社交活动类" },
          { "value": "兴趣爱好类", "name": "兴趣爱好类" },
          { "value": "亲子家庭类", "name": "亲子家庭类" }
        ]
      },
      {
        "question": "组织哪类活动您会感兴趣参加: (多选)",
        "name": "兴趣活动",
        "index": 2,
        "size": 5,
        "items": [
          { "value": "运动", "name": "运动" },
          { "value": "文艺", "name": "文艺如音乐，摄影摄像，手工等)" },
          { "value": "娱乐休闲", "name": "娱乐休闲（如桌游，ktv)" },
          { "value": "公益活动", "name": "公益活动" },
          { "value": "学习培训", "name": "学习培训(职业发展，知识提升" }
        ]
      },
      {
        "question": "组织哪类培训您会感兴趣参加: (多选)",
        "name": "兴趣培训",
        "index": 3,
        "size": 7,
        "items": [
          { "value": "工会知识", "name": "工会知识" },
          { "value": "法律法规", "name": "法律法规" },
          { "value": "在职教育", "name": "在职教育" },
          { "value": "技能培训", "name": "技能培训（办公软件、公开演讲等）" },
          { "value": "职业发展-项目管理-团队管理等）", "name": "职业发展（项目管理、团队管理等）" },
          { "value": "创业课程-注册成立-运营管理等）", "name": "创业课程（注册成立、运营管理等）" },
          { "value": "素质提升-服装搭配-美容美妆)", "name": "素质提升（服装搭配、美容美妆)" }
        ]
      },
      {
        "question": "您的兴趣爱好会体现在？(多选)",
        "name": "个人爱好",
        "index": 4,
        "size": 6,
        "items": [
          { "value": "电影", "name": "电影" },
          { "value": "音乐", "name": "音乐" },
          { "value": "运动", "name": "运动" },
          { "value": "文创", "name": "文创" },
          { "value": "网游手游", "name": "网游/手游" },
          { "value": "旅行", "name": "旅行" }
        ]
      },
      {
        "question": "更愿意参加哪种规模的活动？(单选)",
        "name": "活动规模",
        "index": 5,
        "size": 4,
        "items": [
          { "value": "20人以内", "name": "20人以内" },
          { "value": "20-50人", "name": "20-50人" },
          { "value": "50-100人", "name": "50-100人" },
          { "value": "100人以上", "name": "100人以上" }
        ]
      },
      {
        "question": "您平时多久参加一次集体活动？(单选)",
        "name": "活动频率",
        "index": 6,
        "size": 3,
        "items": [
          { "value": "每周一次", "name": "每周一次" },
          { "value": "每月一次", "name": "每月一次" },
          { "value": "每季度一次", "name": "每季度一次" }
        ]
      },
      {
        "question": "您愿意参与的活动频次？(单选)",
        "name": "意愿频次",
        "index": 7,
        "size": 3,
        "items": [
          { "value": "每周一次", "name": "每周一次" },
          { "value": "每月一次", "name": "每月一次" },
          { "value": "每季度一次", "name": "每季度一次" }
        ]
      },
      {
        "question": "您愿意参与的活动时间？(单选)",
        "name": "意愿时间",
        "index": 8,
        "size": 4,
        "items": [
          { "value": "周末晚上", "name": "周末晚上" },
          { "value": "下班后晚7点到晚9点）", "name": "下班后（19:00-21:00）" },
          { "value": "周末上午", "name": "周末上午" },
          { "value": "周末下午", "name": "周末下午" }
        ]
      },
      {
        "question": "您的休闲时光？(单选)",
        "name": "休息时间",
        "index": 9,
        "size": 4,
        "items": [
          { "value": "双休", "name": "双休" },
          { "value": "单休", "name": "单休" },
          { "value": "大小周", "name": "大小周" },
          { "value": "月度调休", "name": "月度调休" }

        ]
      },
      {
        "question": "您是否会主动寻找活动？(单选)",
        "name": "主动寻找",
        "index": 10,
        "size": 2,
        "items": [
          { "value": "会", "name": "会" },
          { "value": "不会", "name": "不会" }
        ]
      },
      {
        "question": "通过什么渠道寻找活动？(多选)",
        "name": "参与渠道",
        "index": 11,
        "size": 5,
        "items": [
          { "value": "公司组织", "name": "公司组织" },
          { "value": "社区组织", "name": "社区组织" },
          { "value": "app搜索", "name": "app搜索" },
          { "value": "微信推文", "name": "微信推文" },
          { "value": "朋友推荐", "name": "朋友推荐" }
        ]
      },
      {
        "question": "一个好的活动，您更看中哪一点？(多选)",
        "name": "理想特质",
        "index": 12,
        "size": 4,
        "items": [
          { "value": "优质的内容", "name": "优质的内容" },
          { "value": "合理的时间安排", "name": "合理的时间安排" },
          { "value": "有序的活动组织", "name": "有序的活动组织" },
          { "value": "丰富的社交资源", "name": "丰富的社交资源" }
        ]
      },
      {
        "question": "您更期待在活动中收获？(多选)",
        "name": "收获倾向",
        "index": 13,
        "size": 3,
        "items": [
          { "value": "学到技能收获知识", "name": "学到技能、收获知识" },
          { "value": "拓展眼界增长见识", "name": "拓展眼界、增长见识" },
          { "value": "结识朋友扩展社交圈", "name": "结识朋友、扩展社交圈" }
        ]
      },
      {
        "question": "您是否了解创业广场党群服务中心？(单选)",
        "name": "了解党群",
        "index": 14,
        "size": 3,
        "items": [
          { "value": "不知道", "name": "不知道" },
          { "value": "略微了解", "name": "略微了解" },
          { "value": "详细了解", "name": "详细了解" }
        ]
      },
      {
        "question": "您是否参加过创业广场党群服务中心的活动？(单选)",
        "name": "党群参与",
        "index": 15,
        "size": 2,
        "items": [
          { "value": "参加过", "name": "参加过" },
          { "value": "还没有", "name": "还没有" }
        ]
      },
      {
        "question": "您知道工会是做什么的吗？(多选)",
        "name": "了解工会",
        "index": 16,
        "size": 3,
        "items": [
          { "value": "发福利组织活动等", "name": "发福利，组织活动等" },
          { "value": "给员工维权", "name": "给员工维权" },
          { "value": "不知道", "name": "不知道" }
        ]
      },
      {
        "question": "您是通过什么渠道了解工会的？(多选)",
        "name": "工会传播",
        "index": 17,
        "size": 8,
        "items": [
          { "value": "企业工会宣传", "name": "企业工会宣传" },
          { "value": "朋友介绍", "name": "朋友介绍" },
          { "value": "网络书籍", "name": "网络书籍" },
          { "value": "新闻媒体", "name": "新闻媒体" },
          { "value": "街站宣传", "name": "街站宣传" },
          { "value": "维权事件", "name": "维权事件" },
          { "value": "不知道工会", "name": "不知道工会" },
          { "value": "本次调研", "name": "本次调研" }
        ]
      },
      {
        "question": "如已加入工会，您加入的渠道是？(单选)",
        "name": "入会分析",
        "index": 18,
        "size": 7,
        "items": [
          { "value": "企业规定入职时自动加入", "name": "企业规定，入职时自动加入" },
          { "value": "同事介绍加入", "name": "同事介绍加入" },
          { "value": "自愿申请加入", "name": "自愿申请加入" },
          { "value": "工会干部动员", "name": "工会干部动员" },
          { "value": "还没有", "name": "还没有" },
          { "value": "考虑加入", "name": "考虑加入" },
          { "value": "没兴趣", "name": "没兴趣" }
        ]
      },
      {
        "question": "您希望工会提供哪些职业技能培训？(多选)",
        "name": "需求分析",
        "index": 19,
        "size": 7,
        "items": [
          { "value": "投资理财", "name": "投资理财" },
          { "value": "平面设计", "name": "平面设计" },
          { "value": "基础英语", "name": "基础英语" },
          { "value": "科技应用", "name": "科技应用" },
          { "value": "基础会计", "name": "基础会计" },
          { "value": "人力资源专业技能", "name": "人力资源专业技能" },
          { "value": "企业管理", "name": "企业管理" }
        ]
      },
      {
        "question": "您更喜欢青年之家的哪个服务？(多选)",
        "name": "青内涵",
        "index": 20,
        "size": 7,
        "items": [
          { "value": "青组织", "name": "青·组织：智慧团建·推优入党·青年之声" },
          { "value": "青公益", "name": "青·公益：提供社会公益活动" },
          { "value": "青创业", "name": "青·创业：搭建公益创业平台，帮助创业青年寻找青春伙伴人" },
          { "value": "青驿站", "name": "青·驿站：为来深求职大学生提供7天免费住宿、就业咨询及城市融入等" },
          { "value": "青学堂", "name": "青·学堂：开设各类综合课程、提供社会实践和主题沙龙" },
          { "value": "青联盟", "name": "青·联盟：凝聚、联络、培育各种青年社会组织及青年团体，搭建交流推广平台" },
          { "value": "青联谊", "name": "青·联谊：搭建青年交友平台，扩宽社交圈，满足交友、婚恋等成长需求" }
        ]
      },
      {
        "question": "您是否知道园区里的青年之家？(单选)",
        "name": "知道青",
        "index": 21,
        "size": 3,
        "items": [
          { "value": "刚刚知道", "name": "刚刚知道" },
          { "value": "愿意参加青年之家的活动", "name": "愿意参加青年之家的活动" },
          { "value": "不感兴趣", "name": "不感兴趣" }
        ]
      },
      {
        "question": "您的职业: (单选)",
        "name": "职业",
        "index": 22,
        "size": 3,
        "items": [
          { "value": "上班族", "name": "上班族" },
          { "value": "自由职业者", "name": "自由职业者" },
          { "value": "创业者", "name": "创业者" }
        ]
      },
      {
        "question": "您的职务: (单选)",
        "name": "职务",
        "index": 23,
        "size": 4,
        "items": [
          { "value": "员工", "name": "员工" },
          { "value": "部门负责人", "name": "部门负责人" },
          { "value": "公司高层", "name": "公司高层" },
          { "value": "您自己的定位", "name": "您自己的定位" }
        ]
      },
      {
        "question": "性别",
        "name": "性别",
        "index": 24,
        "size": 2,
        "items": [
          { "value": "男", "name": "男" },
          { "value": "女", "name": "女" }
        ]
      },
      {
        "question": "您的年龄范围: (单选)",
        "name": "年龄范围",
        "index": 25,
        "size": 3,
        "items": [
          { "value": "28岁以下", "name": "28岁以下" },
          { "value": "28-30岁", "name": "28-30岁" },
          { "value": "31-35岁", "name": "31-35岁" },
          { "value": "35岁以上", "name": "35岁以上" }
        ]
      },
      {
        "question": "政治面貌: (单选)",
        "name": "政治面貌",
        "index": 26,
        "size": 3,
        "items": [
          { "value": "群众", "name": "群众" },
          { "value": "团员", "name": "团员" },
          { "value": "党员", "name": "党员" }
        ]
      }
    ])
        }
      }]
    }]
  }
};
