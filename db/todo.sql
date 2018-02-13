/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50717
Source Host           : 127.0.0.1:3306
Source Database       : todo

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-02-13 16:15:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for c_todo
-- ----------------------------
DROP TABLE IF EXISTS `c_todo`;
CREATE TABLE `c_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(36) NOT NULL,
  `content` varchar(250) NOT NULL,
  `updateTime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_todo
-- ----------------------------
INSERT INTO `c_todo` VALUES ('1', '1', '123', '2018-02-04 22:00:41');
INSERT INTO `c_todo` VALUES ('2', '1', '2', '2018-02-04 21:23:32');
INSERT INTO `c_todo` VALUES ('3', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('4', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('5', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('6', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('7', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('8', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('9', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('10', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('11', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('12', '1', '3', '2018-02-04 21:36:25');
INSERT INTO `c_todo` VALUES ('13', '1', '1', '2018-02-04 22:00:48');
INSERT INTO `c_todo` VALUES ('14', '1', '1', '2018-02-04 22:00:58');

-- ----------------------------
-- Table structure for c_user
-- ----------------------------
DROP TABLE IF EXISTS `c_user`;
CREATE TABLE `c_user` (
  `id` varchar(36) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `updateTime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_user
-- ----------------------------
INSERT INTO `c_user` VALUES ('1', '1', '2018-02-03 23:48:40', '1', '1');

-- ----------------------------
-- Table structure for wx_token
-- ----------------------------
DROP TABLE IF EXISTS `wx_token`;
CREATE TABLE `wx_token` (
  `appid` varchar(255) NOT NULL,
  `accessToken` varchar(255) NOT NULL,
  `expiresTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` char(20) NOT NULL,
  PRIMARY KEY (`appid`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_token
-- ----------------------------
INSERT INTO `wx_token` VALUES ('wxa1b636191d0d98f2', '6_fVzpzsiKkimE4-_hvU6QD-uE61LkB4rWgH0ymAqS6TGN3Jxhym0w6uCwp2peZ7RTvzlMlEkbP3z862qH8REIeOKPOWgZ4nFMWgByXKL577X_WTC7sXESshSUZ7wDFWcAJATVM', '2018-02-13 15:00:11', 'ACCOUNT_TOKEN');
INSERT INTO `wx_token` VALUES ('wxa1b636191d0d98f2', 'HoagFKDcsGMVCIY2vOjf9hzH6yFWfkLUkwcMUsYOYm3Jqf9WbI78iS3r935CD2tj-OsYbxI6sYwXFov2FmMhpw', '2018-02-13 15:00:12', 'JS_SDK_TICKET');

-- ----------------------------
-- Table structure for wx_user
-- ----------------------------
DROP TABLE IF EXISTS `wx_user`;
CREATE TABLE `wx_user` (
  `openid` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `headimgurl` varchar(255) DEFAULT NULL,
  `privilege` varchar(255) DEFAULT NULL,
  `unionid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_user
-- ----------------------------
INSERT INTO `wx_user` VALUES ('ozEfP0bNUNC4NUrsi-7Zsuk6AnW8', '不行 我太冷', '2', '北京', '朝阳', '中国', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL62BxLqChAXox2XrFqnMTDyk7nJosic9MUdTX3FbZsictx3WkbS6g25h8zo1oUzCKSPty1WBlMfaoA/132', '', null);
INSERT INTO `wx_user` VALUES ('ozEfP0cCn_Xyl5LDxPMIuFZOeroU', '王佩剑', '1', '北京', '西城', '中国', 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJHo8fqDsTr8yPPicoaOFpIssY1kxr3p9iabEdsLpM8n0qJVzYn8FHZdkEo6ybYLtsIga6xoRyl17GA/132', '', null);
