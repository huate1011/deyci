SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `MembersInfo` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `姓名` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `性别` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `电话` varchar(100) COLLATE utf8mb4_unicode_ci,
  `生日` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `户籍地` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `籍贯` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `民族` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `毕业院校` varchar(100) COLLATE utf8mb4_unicode_ci,
  `专业` varchar(100) COLLATE utf8mb4_unicode_ci,
  `文化程度` varchar(100) COLLATE utf8mb4_unicode_ci,
  `工作单位` varchar(100) COLLATE utf8mb4_unicode_ci,
  `工作职务` varchar(100) COLLATE utf8mb4_unicode_ci,
  `紧急联系人` varchar(100) COLLATE utf8mb4_unicode_ci,
  `紧急联系电话` varchar(100) COLLATE utf8mb4_unicode_ci,
  `政治面貌` varchar(100) COLLATE utf8mb4_unicode_ci,
  `邮箱` varchar(100) COLLATE utf8mb4_unicode_ci,
  `现居住地` varchar(500) COLLATE utf8mb4_unicode_ci,
  `所在街道社区` varchar(100) COLLATE utf8mb4_unicode_ci,
  `身份证号` varchar(100) COLLATE utf8mb4_unicode_ci UNIQUE,
  `性格特征` varchar(200) COLLATE utf8mb4_unicode_ci,
  `兴趣爱好` varchar(100) COLLATE utf8mb4_unicode_ci,
  `其他兴趣爱好` varchar(200) COLLATE utf8mb4_unicode_ci,
  `志愿服务时间` varchar(100) COLLATE utf8mb4_unicode_ci,
  `其他时间` varchar(100) COLLATE utf8mb4_unicode_ci,
  `简历` varchar(2048) COLLATE utf8mb4_unicode_ci,
  `身份证正照片` varchar(500) COLLATE utf8mb4_unicode_ci,
  `身份证反照片` varchar(500) COLLATE utf8mb4_unicode_ci,
  `其他建议` varchar(2048) COLLATE utf8mb4_unicode_ci,
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息';

CREATE INDEX idx_name on `MembersInfo` (`姓名`);
CREATE INDEX idx_phone on `MembersInfo` (`电话`);
CREATE INDEX idx_personalid on `MembersInfo` (`身份证号`);
CREATE INDEX idx_idhead on `MembersInfo` (`身份证正照片`);
CREATE INDEX idx_idback on `MembersInfo` (`身份证反照片`);

SET FOREIGN_KEY_CHECKS = 1;

-- Alter table
ALTER TABLE `MembersInfo` ADD COLUMN `志愿者号` BIGINT UNIQUE;
CREATE INDEX idx_volunteer on `MembersInfo` (`志愿者号`);
-- alter table `MembersInfo` drop foreign key `MembersInfo_ibfk_1`;
