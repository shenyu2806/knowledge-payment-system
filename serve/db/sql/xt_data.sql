/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726 (5.7.26)
 Source Host           : localhost:3306
 Source Schema         : xt

 Target Server Type    : MySQL
 Target Server Version : 50726 (5.7.26)
 File Encoding         : 65001

 Date: 26/08/2024 15:28:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for keywords
-- ----------------------------
DROP TABLE IF EXISTS `keywords`;
CREATE TABLE `keywords`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '关键词',
  `counter` int(11) NOT NULL COMMENT '搜索量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of keywords
-- ----------------------------
INSERT INTO `keywords` VALUES (1, 'Vue', 29615);
INSERT INTO `keywords` VALUES (2, 'Java', 29618);
INSERT INTO `keywords` VALUES (3, 'Css', 499);
INSERT INTO `keywords` VALUES (4, 'Html', 406);
INSERT INTO `keywords` VALUES (5, 'ts', 178);
INSERT INTO `keywords` VALUES (6, 'React', 178);
INSERT INTO `keywords` VALUES (7, 'javascript', 176);
INSERT INTO `keywords` VALUES (8, 'js', 120);
INSERT INTO `keywords` VALUES (9, 'ad', 10);
INSERT INTO `keywords` VALUES (10, 'ty', 1);

-- ----------------------------
-- Table structure for logs
-- ----------------------------
DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '类型(0是登录，1是注册，2是修改，3是删除)',
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户账号',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '描述',
  `ipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '客户端ip',
  `time` datetime NULL DEFAULT NULL COMMENT '计入时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of logs
-- ----------------------------
INSERT INTO `logs` VALUES (17, '0', 'admin', '超级管理员登录成功！', NULL, '2024-08-24 19:36:22');
INSERT INTO `logs` VALUES (16, '0', '', '注销啦！', NULL, '2024-08-24 19:35:20');
INSERT INTO `logs` VALUES (15, '0', '', '注销啦！', NULL, '2024-08-24 19:34:32');
INSERT INTO `logs` VALUES (14, '0', 'admin', '超级管理员注销啦！', NULL, '2024-08-24 19:26:01');
INSERT INTO `logs` VALUES (13, '0', 'admin', '超级管理员登录成功！', NULL, '2024-08-24 19:24:41');
INSERT INTO `logs` VALUES (12, '0', 'admin', '超级管理员注销啦！', NULL, '2024-08-24 19:24:36');
INSERT INTO `logs` VALUES (18, '0', 'admin', '超级管理员注销啦！', NULL, '2024-08-24 19:36:42');
INSERT INTO `logs` VALUES (19, '0', 'admin', '超级管理员注销啦！', NULL, '2024-08-24 19:36:45');
INSERT INTO `logs` VALUES (20, '0', 'admin', '超级管理员注销啦！', NULL, '2024-08-24 19:37:22');
INSERT INTO `logs` VALUES (21, '0', 'admin', '超级管理员注销啦！', NULL, '2024-08-24 19:39:10');
INSERT INTO `logs` VALUES (22, '0', 'admin', '超级管理员注销啦！', NULL, '2024-08-24 19:40:08');
INSERT INTO `logs` VALUES (23, '0', 'admin', '超级管理员登录成功！', '127.0.0.1', '2024-08-24 19:43:50');
INSERT INTO `logs` VALUES (24, '0', '', '注销啦！', '127.0.0.1', '2024-08-24 19:50:40');
INSERT INTO `logs` VALUES (25, '0', 'admin', '超级管理员登录成功！', '[object Object]', '2024-08-24 19:51:47');
INSERT INTO `logs` VALUES (26, '0', 'admin', '超级管理员注销啦！', '[object Object]', '2024-08-24 19:52:23');
INSERT INTO `logs` VALUES (27, '0', 'admin', '超级管理员登录成功！', '[object Object]', '2024-08-24 19:56:14');
INSERT INTO `logs` VALUES (28, '0', 'admin', '超级管理员注销啦！', NULL, '2024-08-24 20:08:48');
INSERT INTO `logs` VALUES (29, '0', 'admin', '超级管理员登录成功！', '[object Object]', '2024-08-24 20:11:16');
INSERT INTO `logs` VALUES (30, '0', 'admin', '超级管理员注销啦！', '[object Object]', '2024-08-24 20:17:28');
INSERT INTO `logs` VALUES (31, '0', 'admin', '超级管理员登录成功！', NULL, '2024-08-24 20:36:09');
INSERT INTO `logs` VALUES (32, '0', 'admin', '超级管理员注销啦！', NULL, '2024-08-24 20:38:13');
INSERT INTO `logs` VALUES (33, '0', 'admin', '超级管理员登录成功！', '172.17.1.13', '2024-08-24 20:38:38');
INSERT INTO `logs` VALUES (34, '0', 'admin', '超级管理员登录成功！', '172.17.1.13', '2024-08-24 20:57:53');
INSERT INTO `logs` VALUES (35, '0', 'admin', '超级管理员注销啦！', '172.17.1.13', '2024-08-24 20:58:28');
INSERT INTO `logs` VALUES (36, '0', 'admin', '超级管理员登录成功！', '172.17.1.13', '2024-08-24 21:11:23');
INSERT INTO `logs` VALUES (37, '0', 'admin', '超级管理员注销啦！', '172.17.1.13', '2024-08-24 21:11:26');
INSERT INTO `logs` VALUES (38, '0', 'admin', '超级管理员注销啦！', '172.17.1.13', '2024-08-24 22:55:12');
INSERT INTO `logs` VALUES (39, '0', 'shenyun', '神月登录成功！', '172.17.1.13', '2024-08-24 22:55:28');
INSERT INTO `logs` VALUES (40, '0', 'shenyun', '神月注销啦！', '172.17.1.13', '2024-08-24 22:56:03');
INSERT INTO `logs` VALUES (41, '0', 'tuzw', '用户登录成功！', '172.17.1.13', '2024-08-25 00:32:31');
INSERT INTO `logs` VALUES (42, '0', 'tuzw', '用户注销啦！', '172.17.1.13', '2024-08-25 00:32:34');
INSERT INTO `logs` VALUES (43, '0', 'tuzw', '用户登录成功！', '172.17.1.13', '2024-08-25 00:33:07');
INSERT INTO `logs` VALUES (44, '0', 'tuzw', '用户注销啦！', '172.17.1.13', '2024-08-25 00:33:11');
INSERT INTO `logs` VALUES (45, '0', 'admin', '超级管理员登录成功！', '172.17.1.13', '2024-08-26 13:53:03');
INSERT INTO `logs` VALUES (46, '0', 'admin', '超级管理员登录成功！', '172.17.1.13', '2024-08-26 14:03:24');
INSERT INTO `logs` VALUES (47, '0', 'admin', '超级管理员注销啦！', '172.17.1.13', '2024-08-26 14:35:01');
INSERT INTO `logs` VALUES (48, '0', 'admin', '超级管理员登录后台成功！', '172.17.1.13', '2024-08-26 14:46:01');
INSERT INTO `logs` VALUES (49, '0', 'admin', '超级管理员注销后台啦！', '172.17.1.13', '2024-08-26 15:27:31');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '会员等级名称',
  `authority` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'authority',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '状态(0是关闭,1是启用)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES (1, '默认会员', '0101', '1');
INSERT INTO `member` VALUES (2, 'VIP', '0111', '1');
INSERT INTO `member` VALUES (3, 'SVIP', '1111', '1');

-- ----------------------------
-- Table structure for most
-- ----------------------------
DROP TABLE IF EXISTS `most`;
CREATE TABLE `most`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `teachingType` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '授课类型（1：录播；2：直播）',
  `clicks` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '观看数',
  `isRecommend` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '是否推荐（1：推荐；0：不推荐）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '状态（1：上架；0：下架）',
  `createBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `firstCategory` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '一级分类',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `salePrice` decimal(10, 2) NULL DEFAULT NULL COMMENT '售价',
  `ext1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '扩展字段1',
  `isMember` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '是否为会员课程（1：是；0：否）',
  `saleType` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '售卖类型（1：普通售卖；2：不对外售卖）',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签',
  `courseName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '课程名称',
  `discountPrice` decimal(10, 2) NULL DEFAULT NULL COMMENT '优惠价',
  `courseLevel` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '课程等级（1：初级；2：中级；3：高级）',
  `isIntegral` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '是否可积分购买（1：使用积分（最大兑换比例为30%）；0：不使用积分；）',
  `totalHour` int(11) NULL DEFAULT NULL COMMENT '总时长',
  `lecturerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '讲师名称',
  `courseCover` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '课程图片封面',
  `ext3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '扩展字段3',
  `ext2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '扩展字段2',
  `purchaseCounter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '购买基数',
  `secondCategoryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '二级分类名称',
  `bizCourseChapters` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '章节',
  `secondCategory` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '二级分类',
  `bizCourseAttachments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '课程资料',
  `firstCategoryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '一级分类名称',
  `bizCourseDetail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '课程详情',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of most
-- ----------------------------
INSERT INTO `most` VALUES (1, '1', '28475', '1', '1', '管理员', '零基础课程', '2024-08-21 12:19:08', NULL, 388.00, NULL, '1', '0', '[\"js\",\"css\"]', '晋级TypeScript高手，成为抢手的项目高手', 188.00, '1', '1', NULL, NULL, 'http://172.17.1.13:3000/images/kcxx/TypeScript.jpeg', NULL, NULL, '9662', NULL, '[]', NULL, '[]', '基础', NULL);
INSERT INTO `most` VALUES (2, '0', '23475', '1', '1', '管理员', '零基础课程', '2024-08-22 12:19:12', NULL, 168.00, NULL, '1', '1', '[\"java\"]', 'java基础入门', 0.00, '0', '1', NULL, NULL, 'http://172.17.1.13:3000/images/kcxx/java.jpeg', NULL, NULL, '8542', NULL, '[]', NULL, '[]', '基础', NULL);
INSERT INTO `most` VALUES (4, '1', '8524', '1', '0', '管理员', '高级课程', '2024-08-22 12:19:16', NULL, 755.00, NULL, '1', '0', NULL, '前端框架vue3快速入门', 298.00, '2', '1', NULL, '神月', 'http://172.17.1.13:3000/images/kcxx/vue.jpeg', NULL, NULL, '12504', NULL, '[]', '前端开发', '[]', '基础', '');
INSERT INTO `most` VALUES (3, '0', '36942', '1', '1', '管理员', '零基础课程', '2024-08-22 12:19:20', NULL, 892.00, NULL, '1', '1', NULL, 'HTML3+CSS新人快速入门', 398.00, '0', '0', NULL, NULL, 'http://172.17.1.13:3000/images/kcxx/html.jpeg', NULL, NULL, '5364', NULL, '[]', NULL, '[]', '基础', NULL);
INSERT INTO `most` VALUES (5, '0', '15842', '1', '1', '管理员', '零基础课程', '2024-08-22 12:19:24', NULL, 635.00, NULL, '1', '1', NULL, '前端框架uiapp快速入门', 388.00, '0', '0', NULL, NULL, 'http://172.17.1.13:3000/images/kcxx/uiapp.jpeg', NULL, NULL, '8753', NULL, '[]', NULL, '[]', '基础', NULL);
INSERT INTO `most` VALUES (6, '1', '24356', '1', '1', '管理员', '零基础课程', '2024-08-21 12:19:28', NULL, 648.00, NULL, '1', '1', NULL, 'PHP动态网页技术快速入门', 584.00, '0', '0', NULL, NULL, 'http://172.17.1.13:3000/images/kcxx/php.jpeg', NULL, NULL, '5352', NULL, '[]', NULL, '[]', '基础', NULL);
INSERT INTO `most` VALUES (7, '0', '452136', '0', '1', '管理员', '中级课程', '2024-08-21 16:20:05', NULL, 542.00, NULL, '1', '1', NULL, 'HTML+DIV网页布局设计', 0.00, '1', '0', NULL, NULL, 'http://172.17.1.13:3000/images/kcxx/html.jpeg', NULL, NULL, '0', NULL, '[]', NULL, '[]', '基础', NULL);
INSERT INTO `most` VALUES (8, '0', '75821', '0', '1', '管理员', '高级课程', '2024-08-22 17:02:08', NULL, 782.00, NULL, '1', '1', NULL, 'PHP+Mysql网站响应式开发', 588.00, '2', '0', NULL, NULL, 'http://172.17.1.13:3000/images/kcxx/php.jpeg', NULL, NULL, '0', NULL, '[]', NULL, '[]', '基础', NULL);

-- ----------------------------
-- Table structure for reglogs
-- ----------------------------
DROP TABLE IF EXISTS `reglogs`;
CREATE TABLE `reglogs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户账号',
  `ipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '客户端ip',
  `beizhu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reglogs
-- ----------------------------
INSERT INTO `reglogs` VALUES (1, 'ada', '172.17.1.13', NULL, '2024-08-24 00:27:12');
INSERT INTO `reglogs` VALUES (3, 'tuzw', '172.17.1.13', NULL, '2024-08-25 00:31:16');

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '值',
  `creationTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updataTime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of setting
-- ----------------------------
INSERT INTO `setting` VALUES (1, 'uiapp首页公告', '爱学习网开放第一版测试啦！', '2024-08-25 11:51:16', NULL);

-- ----------------------------
-- Table structure for sliders
-- ----------------------------
DROP TABLE IF EXISTS `sliders`;
CREATE TABLE `sliders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pcHref` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电脑端链接地址',
  `imageName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片名称',
  `imageUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '图片地址',
  `appHref` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'app端链接地址',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `createBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `imageRemark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `updateBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sliders
-- ----------------------------
INSERT INTO `sliders` VALUES (1, NULL, '轮播图1', 'http://172.17.1.13:3000/images/home/lbt/swiper1.png', NULL, NULL, '1', NULL, NULL, NULL);
INSERT INTO `sliders` VALUES (2, NULL, '轮播图2', 'http://172.17.1.13:3000/images/home/lbt/swiper2.png', NULL, NULL, '1', NULL, NULL, NULL);
INSERT INTO `sliders` VALUES (3, NULL, '轮播图3', 'http://172.17.1.13:3000/images/home/lbt/swiper3.png', NULL, NULL, '1', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sort
-- ----------------------------
DROP TABLE IF EXISTS `sort`;
CREATE TABLE `sort`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '缩略图',
  `level` int(11) NULL DEFAULT 0 COMMENT '层级',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '描述',
  `categoryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `parentId` int(11) NULL DEFAULT NULL COMMENT '上级ID',
  `createBy` int(11) NULL DEFAULT NULL COMMENT '创建人',
  `updateBy` int(11) NULL DEFAULT NULL COMMENT '修改人',
  `children` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '下级分类',
  `ext3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '扩展字段3',
  `ext2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '扩展字段2',
  `ext1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '扩展字段1',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '状态（1：启用；0：禁用）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sort
-- ----------------------------
INSERT INTO `sort` VALUES (1, '', 0, 'PHP', '基础', 0, 1, NULL, '[2,3]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (3, 'http://172.17.1.13:3000/images/kcxx/html.jpeg', 0, 'HTML', 'HTML', 1, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (2, 'http://172.17.1.13:3000/images/kcxx/php.jpeg', 0, 'PHP', 'PHP', 1, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (4, 'http://172.17.1.13:3000/images/kcxx/html.jpeg', 0, 'HTML', 'HTML', 1, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (5, 'http://172.17.1.13:3000/images/kcxx/html.jpeg', 0, 'HTML', 'HTML', 1, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (6, 'http://172.17.1.13:3000/images/kcxx/html.jpeg', 0, 'HTML', 'HTML', 1, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (7, NULL, 0, 'CSS', '初级', 0, 0, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (8, '', 0, 'opds', 'web', 0, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (9, NULL, 0, 'iiod', 'node.js', 0, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (10, 'http://172.17.1.13:3000/images/kcxx/vue.jpeg', 0, 'vue', 'vue', 8, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (11, 'http://172.17.1.13:3000/images/kcxx/uiapp.jpeg', 0, 'vue', 'uiapp', 8, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (12, 'http://172.17.1.13:3000/images/kcxx/uiapp.jpeg', 0, 'vue', 'csapp', 8, 1, NULL, '[]', NULL, NULL, NULL, '1');
INSERT INTO `sort` VALUES (13, 'http://172.17.1.13:3000/images/kcxx/uiapp.jpeg', 0, 'vue', 'cosp', 7, 1, NULL, '[]', NULL, NULL, NULL, '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `account` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户账号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `identity` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户类型(0是管理员，1是老师，2是用户，3信息维护)',
  `permissions` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户权限',
  `member` char(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '会员等级',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '用户' COMMENT '用户姓名',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户性别',
  `image_url` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '用户头像地址',
  `create_time` datetime NULL DEFAULT NULL COMMENT '用户创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '用户更新时间',
  `status_time` datetime NULL DEFAULT NULL COMMENT '封号时间',
  `thawed_time` datetime NULL DEFAULT NULL COMMENT '解除时间',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户状态(0是封号，1是正常)',
  `online` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '用户在线情况(0不在线，1是在线)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 97 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '$2a$10$QH9xI8iXoCdMEM0FFHWrqej/2uqqbqimgJKRG0EO4IPtoDxXFouVu', '0', '1111', '默认会员', '超级管理员', 'admin@admin.com', '女', 'https://foruda.gitee.com/avatar/1723290893308622047/8841114_fs529_1723290893.png!avatar200', '2024-08-23 10:04:48', '2024-08-23 10:45:59', '2024-08-23 10:46:06', '2024-08-27 10:45:55', '1', '0');
INSERT INTO `users` VALUES (68, 'shenyun', '$2a$10$u1Cco3eqM9gJFKeAkWpYgeTDxSDzkRsQU.m.taQ4AaCj7Du6xHkQW', '3', '1010', 'VIP', '神月', 'admin@admin.com', '女', 'https://foruda.gitee.com/avatar/1723290893308622047/8841114_fs529_1723290893.png!avatar200', '2024-08-23 10:05:09', '2030-07-26 11:29:44', NULL, '2024-08-23 11:30:36', '1', '0');
INSERT INTO `users` VALUES (70, 'yueyue', '$2a$10$huz5o1ywBwvv7fqpTd7zD.s9LbEiI/EHNUcAhCDxSMeE58l3ehJAK', '2', '0101', '默认会员', '提炼', 'admin@admin.com', '女', 'https://foruda.gitee.com/avatar/1723290893308622047/8841114_fs529_1723290893.png!avatar200', '2024-08-23 19:22:15', '2024-08-26 14:21:48', '2024-08-26 14:21:48', '2024-08-26 17:21:48', '0', '0');
INSERT INTO `users` VALUES (71, 'yueops', '$2a$10$21JHDoaFa1yn31e0yaWeDei0O6nky1.satcH9Fg2lS/ksjvRTb6hW', '2', '0101', 'SVIP', '消息', 'admin@admin.com', '女', NULL, '2024-08-23 19:22:55', '2024-08-23 23:42:48', '2024-08-23 23:42:01', '2024-08-24 02:42:01', '1', '0');
INSERT INTO `users` VALUES (72, 'yueopss', '$2a$10$PbzU0HX8bor/auL2VCCIru8k1v4iaqEt4fwP7aRatz7kqSzrz86Le', '2', '0101', 'VIP', '信息', 'admin@admin.com', '女', NULL, '2024-08-23 19:23:41', '2024-08-23 23:43:08', '2024-08-23 23:43:08', '2024-08-24 00:43:08', '0', '0');
INSERT INTO `users` VALUES (73, 'yueopsi', '$2a$10$sfAIKf5K7xA5Lgo6918CMu96zkaaJXJTZe7seStffhB.pMqmQPKkq', '2', '0101', 'VIP', '天空', 'admin@admin.com', '女', NULL, '2024-08-23 19:23:47', '2024-08-23 20:26:24', '2024-08-23 20:26:24', '2024-08-24 20:26:24', '1', '0');
INSERT INTO `users` VALUES (74, 'adsf', '$2a$10$4PbzXhgMi2t71B3W9qLV/OqsKIZz/Wnqu2u3ccs4BNLBBHS1T53uu', '2', '0101', '1', 'jksd', 'admin@admin.com', '男', '', '2024-08-23 23:34:23', '2024-08-23 23:43:14', '2024-08-23 23:43:14', '2024-08-24 01:43:14', '0', '0');
INSERT INTO `users` VALUES (75, 'apo1', '$2a$10$zi.4Rw3kStZnIFZQXtIo7ekt4jgCF8NEq1yu0suMnDDD3z5sMYJQi', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:48:51', '2024-08-26 14:21:36', '2024-08-26 14:21:36', '2024-08-26 17:21:36', '0', '0');
INSERT INTO `users` VALUES (76, 'apo2', '$2a$10$dWeVfbtsXOJS7jfCUKRtCOIhcw5TDE1T6eaEhFW5is4GSGyvtUK9O', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:48:55', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (77, 'apo3', '$2a$10$I/1dAmM9fKk.wQDior8hw.l4mDZr2i2pS.LXREsVp9XWi9li618pO', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:48:58', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (78, 'apo4', '$2a$10$UUvkDbf12tTcOFyvIFiNuelR6VORH/lPM2DN//LfGZTWBemI5JruW', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:49:01', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (79, 'apo5', '$2a$10$LswOKOIWmRbSg1WjySsBw.kAiwhPPhBoRGfjx5lXJOarGdZTnBHEq', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:49:04', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (80, 'apo6', '$2a$10$UJdtrcOqHj2kCZSAnf8wdu3lHwED6s7aob9c4wZF/Cu9ei3uEt/tq', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:49:07', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (81, 'apo7', '$2a$10$dMiQLq0Qtff7TyXeKrdnDelR9N3WAE9dc64t5tipeFJiF/Ftv7Ruy', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:49:10', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (82, 'apo8', '$2a$10$v0xI0wE6ShMGPH4cr/V4/udSlWOzov7YckwNR6CU64kerrCF09eZa', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:49:14', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (83, 'apo9', '$2a$10$Hh8iXgNteEMytIf1sxnf2u4B2kypfpd5cpGbtV4.GAf4semLPxFGC', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:49:17', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (84, 'apo10', '$2a$10$qBt2nIsIMI/00jfeFMSFOOOCxpixvrApNgYTXVQlERFYTMLgvERsC', '2', '0101', '1', '用户', NULL, NULL, NULL, '2024-08-24 13:49:20', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (91, 'tuzw', '$2a$10$/nt1yzawzk7GDD4xOGfYN.Ed9oEknw94EUR24ARGixAVTGqaOyy0.', '2', '0101', '默认会员', '用户', '1678331697@qq.com', NULL, NULL, '2024-08-25 00:31:16', NULL, NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (85, 'ghjk', '$2a$10$EiEu8DXMuG0OmZtALP0hB.uW12ZEsCtEG1YdlHAZ54Or8Ttamd.rm', '2', '0101', '默认会员', '用户', '758427981@qq.com', NULL, NULL, '2024-08-25 00:04:11', NULL, NULL, NULL, '0', '0');
INSERT INTO `users` VALUES (86, 'sjks', '$2a$10$ne8nXx1PvuqQDV9rXHeJ9.ZyYFOWRDd10jDdL0/LZnHF7vkgzhmLm', '2', '0101', '默认会员', '用户', '758427981@qq.com', NULL, NULL, '2024-08-25 00:11:49', NULL, NULL, NULL, '0', '0');
INSERT INTO `users` VALUES (87, 'sjks', '$2a$10$rJExipSw6vZUkSoDkJbuCOCemOjjAM/QZru3bdc1NwOk5UTRuZYfy', '2', '0101', '默认会员', '用户', 'opsd@ada.com', NULL, NULL, '2024-08-25 00:15:12', NULL, NULL, NULL, '0', '0');
INSERT INTO `users` VALUES (88, 'sjks', '$2a$10$9ia9sRaJeaZSNBpJ80KdJOgV53aKY/8U1t3qFI/z3z9rAhAcoBF9u', '2', '0101', '默认会员', '用户', 'opsd@adp.com', NULL, NULL, '2024-08-25 00:16:06', NULL, NULL, NULL, '0', '0');
INSERT INTO `users` VALUES (89, 'ada', '$2a$10$XaAcrnSgmjGQcvwyS.v2FOlNia7p5A8/mJNyvlea9qouDMWZVDga6', '2', '0101', '默认会员', '用户', 'opsad@adp.com', NULL, NULL, '2024-08-25 00:27:13', NULL, NULL, NULL, '0', '0');
INSERT INTO `users` VALUES (90, 'asdd', '$2a$10$tmh4DNqqY8saR0TkZt8yW.TxFfncW0xuOY9VQmRhjLj/DB1hxaEBC', '2', '0101', '默认会员', '用户', 'opsadasd@adp.com', NULL, NULL, '2024-08-25 00:29:05', NULL, NULL, NULL, '0', '0');
INSERT INTO `users` VALUES (95, 'opsghjkkll', '$2a$10$Rz6U.ITEspS5QgCpMTXJ1.xjWXbwX92DsgpVGo0xJAJYeeyOeX/Hi', '1', '0101', 'SVIP', '小月', 'admin@admin.com', '男', '', '2024-08-26 14:30:53', '2024-08-26 14:34:17', '2024-08-26 14:34:17', '2024-08-26 17:34:17', '0', '0');
INSERT INTO `users` VALUES (93, 'opsdf', '$2a$10$Kguc0yq5JvYKWtFYpFCF9eVVN9bNBfMm5H5Dn/7YyVk0a8wH/v1M6', '1', '0101', 'VIP', '神月', 'admin@admin.com', '男', '', '2024-08-26 14:26:47', '2024-08-26 14:34:20', '2024-08-26 14:34:20', '2024-08-26 20:34:20', '0', '0');
INSERT INTO `users` VALUES (94, 'iopqwe', '$2a$10$SsP0CiQS0tY5ieciGdEVkuCt5yI6tBTWGmlGzRyZ2aHxqW1Pbufu.', '1', '0101', 'SVIP', '月月', 'admin@admin.com', '男', '', '2024-08-26 14:26:58', '2024-08-26 14:32:18', NULL, NULL, '1', '0');
INSERT INTO `users` VALUES (96, 'iopsdplp', '$2a$10$wXi7Gf5UiIANUrq7AbRKauFjsWojxBk9A5k1FK0.X5OYgQBT5Pd86', '1', '0101', 'SVIP', '小月', 'admin@admin.com', '男', '', '2024-08-26 14:34:02', NULL, NULL, NULL, '1', '0');

SET FOREIGN_KEY_CHECKS = 1;
