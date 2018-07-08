/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

DROP TABLE IF EXISTS `PersonalSurveys`;
CREATE TABLE `PersonalSurveys` (
  `ID` int NOT NULL AUTO_INCREMENT,  
  `open_id` varchar(2048) COLLATE utf8mb4_unicode_ci,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `最近一次活动` varchar(500) COLLATE utf8mb4_unicode_ci,
  `角色承担` varchar(200) COLLATE utf8mb4_unicode_ci,
  `喜好类型` varchar(500) COLLATE utf8mb4_unicode_ci,
  `兴趣活动` varchar(500) COLLATE utf8mb4_unicode_ci,
  `兴趣培训` varchar(500) COLLATE utf8mb4_unicode_ci,
  `个人爱好` varchar(500) COLLATE utf8mb4_unicode_ci,
  `活动规模` varchar(200) COLLATE utf8mb4_unicode_ci,
  `活动频率` varchar(200) COLLATE utf8mb4_unicode_ci,
  `意愿频次` varchar(200) COLLATE utf8mb4_unicode_ci,  
  `意愿时间` varchar(200) COLLATE utf8mb4_unicode_ci,
  `休息时间` varchar(200) COLLATE utf8mb4_unicode_ci,
  `理想特质` varchar(500) COLLATE utf8mb4_unicode_ci,
  `收获倾向` varchar(500) COLLATE utf8mb4_unicode_ci,
  `主动寻找` varchar(200) COLLATE utf8mb4_unicode_ci,
  `参与渠道` varchar(500) COLLATE utf8mb4_unicode_ci,
  `了解党群` varchar(100) COLLATE utf8mb4_unicode_ci,
  `党群参与` varchar(500) COLLATE utf8mb4_unicode_ci,
  `了解工会` varchar(200) COLLATE utf8mb4_unicode_ci,
  `工会传播` varchar(200) COLLATE utf8mb4_unicode_ci,
  `需求分析` varchar(200) COLLATE utf8mb4_unicode_ci,
  `青内涵` varchar(200) COLLATE utf8mb4_unicode_ci,
  `知道青` varchar(200) COLLATE utf8mb4_unicode_ci,
  `近来办理事务种类` varchar(200) COLLATE utf8mb4_unicode_ci,  
  `入会分析` varchar(100) COLLATE utf8mb4_unicode_ci,
  `专业领域` varchar(100) COLLATE utf8mb4_unicode_ci,  
  `职业` varchar(100) COLLATE utf8mb4_unicode_ci,
  `职务` varchar(100) COLLATE utf8mb4_unicode_ci,
  `公司名字` varchar(100) COLLATE utf8mb4_unicode_ci,    
  `年龄范围` varchar(100) COLLATE utf8mb4_unicode_ci,
  `电话` varchar(100) COLLATE utf8mb4_unicode_ci,
  `性别` varchar(100) COLLATE utf8mb4_unicode_ci,
  `政治面貌` varchar(100) COLLATE utf8mb4_unicode_ci,
  `期待和建议` varchar(2048) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='个人调查问卷';

DROP TABLE IF EXISTS `Companies`;
CREATE TABLE `Companies` (
  `ID` int NOT NULL AUTO_INCREMENT,  
  `name` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,  
  `comments` varchar(2048) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='企业信息';

DROP TABLE IF EXISTS `IndustrySurveys`;
CREATE TABLE `IndustrySurveys` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `open_id` varchar(2048) COLLATE utf8mb4_unicode_ci,
  `公司名字` varchar(500) COLLATE utf8mb4_unicode_ci,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `贵公司员工数量` INTEGER COLLATE utf8mb4_unicode_ci,
  `贵公司员工平均年龄约` INTEGER COLLATE utf8mb4_unicode_ci,
  `贵公司成立时间` varchar(500) COLLATE utf8mb4_unicode_ci,  
  `贵公司规模` varchar(500) COLLATE utf8mb4_unicode_ci,
  `已成立组织` varchar(500) COLLATE utf8mb4_unicode_ci,
  `组织活动频次` varchar(500) COLLATE utf8mb4_unicode_ci,
  `组织什么活动` varchar(500) COLLATE utf8mb4_unicode_ci,
  `意向成立组织` varchar(500) COLLATE utf8mb4_unicode_ci,
  `了解组织要求` varchar(500) COLLATE utf8mb4_unicode_ci,
  `公司活动` varchar(500) COLLATE utf8mb4_unicode_ci,
  `其他公司活动` varchar(500) COLLATE utf8mb4_unicode_ci,
  `帮助成立组织` varchar(500) COLLATE utf8mb4_unicode_ci,
  `组织活动困难` varchar(500) COLLATE utf8mb4_unicode_ci,
  `其他组织活动困难` varchar(500) COLLATE utf8mb4_unicode_ci,
  `了解党群服务` varchar(500) COLLATE utf8mb4_unicode_ci,
  `公司需要的支持` varchar(500) COLLATE utf8mb4_unicode_ci,
  `团队需要哪些支持` varchar(500) COLLATE utf8mb4_unicode_ci,
  `近来办理的事项` varchar(500) COLLATE utf8mb4_unicode_ci,
  `近来政府机办理的业务` varchar(500) COLLATE utf8mb4_unicode_ci,
  `政府机每次时间` varchar(500) COLLATE utf8mb4_unicode_ci,
  `对设立综合业务窗口的看法` varchar(500) COLLATE utf8mb4_unicode_ci,
  `希望政务帮助` varchar(500) COLLATE utf8mb4_unicode_ci,  
  `联系人姓名` varchar(100) COLLATE utf8mb4_unicode_ci,
  `联系人电话` varchar(100) COLLATE utf8mb4_unicode_ci,
  `联系人职务` varchar(100) COLLATE utf8mb4_unicode_ci,
  `行业领域` varchar(100) COLLATE utf8mb4_unicode_ci,
  `期待和建议` varchar(2048) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='企业调查问卷';

SET FOREIGN_KEY_CHECKS = 1;
