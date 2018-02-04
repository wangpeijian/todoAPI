/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : todo

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2018-02-04 21:40:30
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_todo
-- ----------------------------
INSERT INTO `c_todo` VALUES ('1', '1', '123', '2018-02-04 21:40:12');
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
