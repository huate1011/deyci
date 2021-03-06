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

CREATE TABLE `cAppinfo` (
  `appid` varchar(36) COLLATE utf8mb4_unicode_ci,
  `secret` varchar(64) COLLATE utf8mb4_unicode_ci,
  `ip` varchar(20) COLLATE utf8mb4_unicode_ci,
  `login_duration` int(11),
  `qcloud_appid` varchar(64) COLLATE utf8mb4_unicode_ci,  
  `session_duration` int(11) COLLATE,
  )  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
CREATE TABLE `cAppinfo` (
  `appid` varchar(36) COLLATE utf8mb4_unicode_ci,
  `secret` varchar(64) COLLATE utf8mb4_unicode_ci,
  `ip` varchar(20) COLLATE utf8mb4_unicode_ci,
  `login_duration` int(11),
  `qcloud_appid` varchar(64) COLLATE utf8mb4_unicode_ci,  
  `session_duration` int(11)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='capp'

-- DROP TABLE IF EXISTS `MemberInfo`;
-- CREATE TABLE `MemberInfo` (
--   `ID` int NOT NULL AUTO_INCREMENT,
--   `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `gender` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `phone` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `dob` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `pob` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,			
--   `origin` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `nation` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `education` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `subject` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `degree` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `workplace` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `profession` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `emergencyname` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `emergencyphone` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `politics` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `email` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `address` varchar(500) COLLATE utf8mb4_unicode_ci,
--   `council` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `personalid` varchar(100) COLLATE utf8mb4_unicode_ci UNIQUE,
--   `personality` varchar(200) COLLATE utf8mb4_unicode_ci,
--   `skills` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `otherskills` varchar(200) COLLATE utf8mb4_unicode_ci,
--   `availability` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `otheravailability` varchar(100) COLLATE utf8mb4_unicode_ci,
--   `curriculum` varchar(2048) COLLATE utf8mb4_unicode_ci,
--   `idhead` varchar(500) COLLATE utf8mb4_unicode_ci,
--   `idback` varchar(500) COLLATE utf8mb4_unicode_ci,
--   `others` varchar(2048) COLLATE utf8mb4_unicode_ci,
--   `open_id` varchar(100) COLLATE utf8mb4_unicode_ci,  
--   PRIMARY KEY (`ID`),
--   FOREIGN KEY (`open_id`) REFERENCES `cSessionInfo`(`open_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息';

-- CREATE INDEX idx_name on `MemberInfo` (`name`);
-- CREATE INDEX idx_phone on `MemberInfo` (`phone`);
-- CREATE INDEX idx_personalid on `MemberInfo` (`personalid`);
-- CREATE INDEX idx_idhead on `MemberInfo` (`idhead`);
-- CREATE INDEX idx_idback on `MemberInfo` (`idback`);

-- -- Alter table
-- ALTER TABLE `MemberInfo` ADD COLUMN `volunteerid` BIGINT UNIQUE;
-- CREATE INDEX idx_volunteer on `MemberInfo` (`volunteerid`);

SET FOREIGN_KEY_CHECKS = 1;



CREATE TABLE `会员信息` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `姓名` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `性别` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `电话` varchar(100) COLLATE utf8mb4_unicode_ci,
  `生日` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `籍贯` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,			
  `户籍` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `民族` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `毕业院校` varchar(100) COLLATE utf8mb4_unicode_ci,
  `专业` varchar(100) COLLATE utf8mb4_unicode_ci,
  `文化程度` varchar(100) COLLATE utf8mb4_unicode_ci,
  `工作单位` varchar(100) COLLATE utf8mb4_unicode_ci,
  `职务` varchar(100) COLLATE utf8mb4_unicode_ci,
  `紧急联系人` varchar(100) COLLATE utf8mb4_unicode_ci,
  `紧急联系电话` varchar(100) COLLATE utf8mb4_unicode_ci,
  `政治面貌` varchar(100) COLLATE utf8mb4_unicode_ci,
  `电子邮箱` varchar(100) COLLATE utf8mb4_unicode_ci,
  `居住地址` varchar(500) COLLATE utf8mb4_unicode_ci,
  `所在街道社区` varchar(100) COLLATE utf8mb4_unicode_ci,
  `身份号` varchar(100) COLLATE utf8mb4_unicode_ci UNIQUE,
  `性格` varchar(200) COLLATE utf8mb4_unicode_ci,
  `专长` varchar(100) COLLATE utf8mb4_unicode_ci,
  `其他专长` varchar(200) COLLATE utf8mb4_unicode_ci,
  `服务时间` varchar(100) COLLATE utf8mb4_unicode_ci,
  `其他服务时间` varchar(100) COLLATE utf8mb4_unicode_ci,
  `简历` varchar(2048) COLLATE utf8mb4_unicode_ci,
  `身份证正面` varchar(500) COLLATE utf8mb4_unicode_ci,
  `身份证反面` varchar(500) COLLATE utf8mb4_unicode_ci,
  `留言` varchar(2048) COLLATE utf8mb4_unicode_ci,
  `自愿者号码` BIGINT UNIQUE,
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci,  
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`open_id`) REFERENCES `cSessionInfo`(`open_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会员信息';

CREATE INDEX idx_name on `会员信息` (`姓名`);
CREATE INDEX idx_phone on `会员信息` (`电话`);
CREATE INDEX idx_personalid on `会员信息` (`身份号`);
CREATE INDEX idx_idhead on `会员信息` (`身份证正面`);
CREATE INDEX idx_idback on `会员信息` (`身份证反面`);

SET FOREIGN_KEY_CHECKS = 1;