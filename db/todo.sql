/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : todo

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2018-02-25 20:36:58
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_todo
-- ----------------------------
INSERT INTO `c_todo` VALUES ('1', '1', 'ListView - 一个核心组件，用于高效地显示一个可以垂直滚动的变化的数据列表。最基本的使用方式就是创建一个ListView.DataSource数据源，然后给它传递一个普通的数据数组，再使用数据源来实例化一个ListView组件，并且定义它的renderRow回调函数，这个函数会接受数组中的', '2018-02-20 17:03:53');
INSERT INTO `c_todo` VALUES ('2', '1', 'ListView还支持一些高级特性，譬如给每段/组(section)数据添加一个带有粘性的头部（类似iPhone的通讯录，其首字母会在滑动过程中吸附在屏幕上方）；在列表头部和尾部增加单独的内容；在到达列表尾部的时候调用回调函数(onEndReached)，还有在视野内可见的数据变化时调用回', '2018-02-20 17:03:59');
INSERT INTO `c_todo` VALUES ('3', '1', '只更新变化的行 - 提供给数据源的rowHasChanged函数可以告诉ListView它是否需要重绘一行数据（即：数据是否发生了变化）参见ListViewDat', '2018-02-20 17:04:07');
INSERT INTO `c_todo` VALUES ('4', '1', '可以用pageSize属性配置）。这把较大的工作分散成小的碎片', '2018-02-20 17:04:16');
INSERT INTO `c_todo` VALUES ('5', '1', 'ScrollView props... \r\n\r\n译注：这意味着ListView可以使用所有ScrollView的属性。', '2018-02-20 17:04:21');
INSERT INTO `c_todo` VALUES ('6', '1', 'dataSource ListViewDataSource \r\n\r\nListView.DataSource实例（列表依赖的数据源）\r\n\r\ninitialListSize number ', '2018-02-20 17:04:29');
INSERT INTO `c_todo` VALUES ('7', '1', 'initialListSize number \r\n\r\n指定在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据，而不是花费太多帧逐步显示出来。', '2018-02-20 17:04:36');
INSERT INTO `c_todo` VALUES ('8', '1', 'onChangeVisibleRows function \r\n\r\n(visibleRows, changedRows) => void', '2018-02-20 17:04:43');
INSERT INTO `c_todo` VALUES ('9', '1', '(visibleRows, changedRows) => void\r\n\r\n当可见的行的集合变化的时候调用此回调函数。visib', '2018-02-20 17:04:48');
INSERT INTO `c_todo` VALUES ('10', '1', 'tionID: { rowID: true }}的格式包含了所有可见行，而changedRows 以{ sectionID: { rowID: true | false }}的格式包含了所有刚', '2018-02-20 17:04:52');
INSERT INTO `c_todo` VALUES ('11', '1', '见性的行，其中如果值为true表示一个行变得可见，而为false表示行刚刚离开可视区域而变得不可见。', '2018-02-20 17:05:00');
INSERT INTO `c_todo` VALUES ('12', '1', '所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。原生的滚动事件会被作为参数传递。译注：当第一次渲染时，如果数据', '2018-02-20 17:05:04');
INSERT INTO `c_todo` VALUES ('13', '1', 'onEndReachedThreshold number \r\n\r\n调用onEndReached之前的临界值，单位是像', '2018-02-20 17:05:10');
INSERT INTO `c_todo` VALUES ('14', '1', 'removeClippedSubviews bool \r\n\r\n用于提升大列表的滚动性能。需要给行容器添加样式overflo', '2018-02-20 17:05:13');
INSERT INTO `c_todo` VALUES ('15', '1', 'removeClippedSubviews bool \r\n\r\n用于提升大列表的滚动性能。需要给行容器添加样式overflo', '2018-02-20 17:05:13');
INSERT INTO `c_todo` VALUES ('16', '1', 'removeClippedSubviews bool \r\n\r\n用于提升大列表的滚动性能。需要给行容器添加样式overflo', '2018-02-20 17:05:13');
INSERT INTO `c_todo` VALUES ('17', '1', 'removeClippedSubviews bool \r\n\r\n用于提升大列表的滚动性能。需要给行容器添加样式overflo', '2018-02-20 17:05:13');
INSERT INTO `c_todo` VALUES ('18', '1', 'removeClippedSubviews bool \r\n\r\n用于提升大列表的滚动性能。需要给行容器添加样式overflo', '2018-02-20 17:05:13');
INSERT INTO `c_todo` VALUES ('19', '1', 'removeClippedSubviews bool \r\n\r\n用于提升大列表的滚动性能。需要给行容器添加样式overflo', '2018-02-20 17:05:13');
INSERT INTO `c_todo` VALUES ('20', '1', 'removeClippedSubviews bool \r\n\r\n用于提升大列表的滚动性能。需要给行容器添加样式overflo', '2018-02-20 17:05:13');
INSERT INTO `c_todo` VALUES ('21', '1', 'removeClippedSubviews bool \r\n\r\n用于提升大列表的滚动性能。需要给行容器添加样式overflo', '2018-02-20 17:05:13');

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
INSERT INTO `c_user` VALUES ('7XDAH5WYeDtXCsWxg7o1eLdZpcwnOXZ7', '2', '2018-02-20 14:27:47', '2', '2');
INSERT INTO `c_user` VALUES ('KcXo9vLFZouvGFcpWtHcvOTjr27UzWuA', '11', '2018-02-20 14:29:32', '11', '2');

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
