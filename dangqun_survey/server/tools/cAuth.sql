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
  `lastevent` varchar(500) COLLATE utf8mb4_unicode_ci,
  `favouriterole` varchar(100) COLLATE utf8mb4_unicode_ci,
  `favouriteactivities` varchar(500) COLLATE utf8mb4_unicode_ci,
  `interestedevents` varchar(500) COLLATE utf8mb4_unicode_ci,
  `interestedtraining` varchar(500) COLLATE utf8mb4_unicode_ci,
  `personalinterests` varchar(500) COLLATE utf8mb4_unicode_ci,
  `eventsize` varchar(100) COLLATE utf8mb4_unicode_ci,
  `eventfrequency` varchar(100) COLLATE utf8mb4_unicode_ci,
  `idealfrequency` varchar(100) COLLATE utf8mb4_unicode_ci,  
  `eventtime` varchar(100) COLLATE utf8mb4_unicode_ci,
  `holidays` varchar(100) COLLATE utf8mb4_unicode_ci,
  `favouritepoints` varchar(500) COLLATE utf8mb4_unicode_ci,
  `eventgains` varchar(500) COLLATE utf8mb4_unicode_ci,
  `canfindevents` varchar(100) COLLATE utf8mb4_unicode_ci,
  `howtofindevents` varchar(500) COLLATE utf8mb4_unicode_ci,
  `knowdang` varchar(100) COLLATE utf8mb4_unicode_ci,
  `attendeddang` varchar(500) COLLATE utf8mb4_unicode_ci,
  `knowsociety` varchar(100) COLLATE utf8mb4_unicode_ci,
  `howtoknowsociety` varchar(100) COLLATE utf8mb4_unicode_ci,
  `trainingskills` varchar(100) COLLATE utf8mb4_unicode_ci,
  `knowqingnian` varchar(100) COLLATE utf8mb4_unicode_ci,
  `favouriteqingnianservice` varchar(100) COLLATE utf8mb4_unicode_ci,
  `joinsociety` varchar(100) COLLATE utf8mb4_unicode_ci,
  `workarea` varchar(100) COLLATE utf8mb4_unicode_ci,
  `workstatus` varchar(100) COLLATE utf8mb4_unicode_ci,
  `profession` varchar(100) COLLATE utf8mb4_unicode_ci,
  `occupation` varchar(100) COLLATE utf8mb4_unicode_ci,
  `age` varchar(100) COLLATE utf8mb4_unicode_ci,
  `gender` varchar(100) COLLATE utf8mb4_unicode_ci,
  `politics` varchar(100) COLLATE utf8mb4_unicode_ci,
  `comments` varchar(2048) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='调查问卷';

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
  `name` varchar(100) COLLATE utf8mb4_unicode_ci,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `employeeno` INTEGER COLLATE utf8mb4_unicode_ci,
  `averageage` INTEGER COLLATE utf8mb4_unicode_ci,
  `currentdangorgs` varchar(500) COLLATE utf8mb4_unicode_ci,
  `activityfrequency` varchar(500) COLLATE utf8mb4_unicode_ci,
  `activitytype` varchar(500) COLLATE utf8mb4_unicode_ci,
  `prospectivedangorgs` varchar(500) COLLATE utf8mb4_unicode_ci,
  `knowrequirements` varchar(500) COLLATE utf8mb4_unicode_ci,
  `pastactivities` varchar(500) COLLATE utf8mb4_unicode_ci,
  `otherpastactivies` varchar(500) COLLATE utf8mb4_unicode_ci,
  `owncontributions` varchar(500) COLLATE utf8mb4_unicode_ci,
  `difficulties` varchar(500) COLLATE utf8mb4_unicode_ci,
  `otherdifficulties` varchar(500) COLLATE utf8mb4_unicode_ci,
  `knowservices` varchar(500) COLLATE utf8mb4_unicode_ci,
  `comments` varchar(2048) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='调查问卷';

SET FOREIGN_KEY_CHECKS = 1;
