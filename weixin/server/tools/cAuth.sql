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

DROP TABLE IF EXISTS `MemberInfo`;
CREATE TABLE `MemberInfo` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pob` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,			
  `origin` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nation` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `education` varchar(100) COLLATE utf8mb4_unicode_ci,
  `subject` varchar(100) COLLATE utf8mb4_unicode_ci,
  `degree` varchar(100) COLLATE utf8mb4_unicode_ci,
  `workplace` varchar(100) COLLATE utf8mb4_unicode_ci,
  `profession` varchar(100) COLLATE utf8mb4_unicode_ci,
  `emergencyname` varchar(100) COLLATE utf8mb4_unicode_ci,
  `emergencyphone` varchar(100) COLLATE utf8mb4_unicode_ci,
  `politics` varchar(100) COLLATE utf8mb4_unicode_ci,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci,
  `address` varchar(500) COLLATE utf8mb4_unicode_ci,
  `council` varchar(100) COLLATE utf8mb4_unicode_ci,
  `personalid` varchar(100) COLLATE utf8mb4_unicode_ci,
  `skills` varchar(100) COLLATE utf8mb4_unicode_ci,
  `otherskills` varchar(200) COLLATE utf8mb4_unicode_ci,
  `availability` varchar(100) COLLATE utf8mb4_unicode_ci,
  `otheravailability` varchar(100) COLLATE utf8mb4_unicode_ci,
  `curriculum` varchar(2048) COLLATE utf8mb4_unicode_ci,
  `idhead` varchar(500) COLLATE utf8mb4_unicode_ci,
  `idback` varchar(500) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)231
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息';

SET FOREIGN_KEY_CHECKS = 1;
