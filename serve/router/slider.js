const express = require('express')
const db = require('../db/index.js')
const router = express.Router()

//轮播图
router.get('/getSliders', (req, res) => {
    sql = "SELECT * FROM sliders"
    const timestamp = new Date().getTime();
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                "meta": {
                    "msg": "操作失败",
                    "code": "500",
                    "success": false,
                    "version": "0.0.1",
                    "timestamp": timestamp
                },
                "data": {}
            })
        }
        res.send({
            "meta": {
                "msg": "操作成功",
                "code": "200",
                "success": true,
                "version": "0.0.1",
                "timestamp": timestamp
            },
            "data": {
                "list": results
            }
        });
    })
});

//热门搜索
router.get('/keywords/getHotKeywords', (req, res) => {
    //查询前面10个,按counter降序
    const sql = "select * from keywords order by counter desc limit 10"
    const timestamp = new Date();
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                "meta": {
                    "msg": "操作失败",
                    "code": "500",
                    "success": false,
                    "version": "0.0.1",
                    "timestamp": timestamp
                },
                "data": {}
            })
        }
        res.send(
            {
                "meta": {
                    "msg": "操作成功",
                    "code": "200",
                    "success": true,
                    "version": "0.0.1",
                    "timestamp": timestamp
                },
                "data": {
                    "list": results
                }
            }
        )
    })
});
//计入搜索
router.post('/keywords/HotKeywords', (req, res) => {
    const { keywords } = req.body;
    const counter = 1;
    let timestamp = new Date(); // 定义在外部，以便在多个地方使用

    // 检查keywords是否已存在
    const sql1 = "SELECT * FROM keywords WHERE keywords=?";
    db.query(sql1, [keywords], (err, results) => {
        if (err) {
            res.send({
                "meta": {
                    "msg": "数据库查询失败",
                    "code": "500",
                    "success": false,
                    "version": "0.0.1",
                    "timestamp": timestamp
                }
            });
            return;
        }

        if (results.length < 1) {
            // 如果不存在，则插入新记录
            const sql2 = "INSERT INTO keywords(keywords, counter) VALUES (?, ?)";
            db.query(sql2, [keywords, counter], (err, results) => {
                if (err) {
                    res.send({
                        "meta": {
                            "msg": "插入失败",
                            "code": "500",
                            "success": false,
                            "version": "0.0.1",
                            "timestamp": timestamp,
                            err
                        }
                    });
                } else {
                    res.send({
                        "meta": {
                            "msg": "插入成功",
                            "code": "200",
                            "success": true,
                            "version": "0.0.1",
                            "timestamp": timestamp
                        }
                    });
                }
            });
        } else {
            // 如果存在，则更新counter
            const sql3 = "UPDATE keywords SET counter=counter+1 WHERE keywords=?";
            db.query(sql3, [keywords], (err, results) => {
                if (err) {
                    res.send({
                        "meta": {
                            "msg": "更新失败",
                            "code": "500",
                            "success": false,
                            "version": "0.0.1",
                            "timestamp": timestamp,
                            err
                        }
                    });
                } else {
                    res.send({
                        "meta": {
                            "msg": "更新成功",
                            "code": "200",
                            "success": true,
                            "version": "0.0.1",
                            "timestamp": timestamp
                        }
                    });
                }
            });
        }
    });
});

// 获取系统公告
router.get('/system/announcement', (req, res) => {
    let timestamp = new Date();
    const sql = "SELECT * FROM setting WHERE name = 'uiapp首页公告'";
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                "meta": {
                    "msg": "操作失败",
                    "code": "500",
                    "success": false,
                    "version": "0.0.1",
                    "timestamp": timestamp
                },
                "data": {}
            })
        }
        res.send(
            {
                "meta": {
                    "msg": "操作成功",
                    "code": "200",
                    "success": true,
                    "version": "0.0.1",
                    "timestamp": timestamp
                },
                "data": {
                    "list": results
                }
            }
        )
    });
});
module.exports = router;