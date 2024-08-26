const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db/index.js')
const router = express.Router()

router.get('/user', (req, res) => {
    res.send({
        code: 200,
        msg: "一切正常"
    })
});

router.post('/register', (req, res) => {
    const reginfo = req.body;
    if (!reginfo.account || !reginfo.password || !reginfo.email) {
        res.status(203).send({
            status: 1,
            message: '账号、密码或邮箱不能为空'
        });
        return;
    }

    const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlCheckEmail, [reginfo.email], (err, results) => {
        if (err) {
            res.status(500).send({
                status: 1,
                message: '数据库查询错误'
            });
            return;
        }

        if (results.length > 0) {
            res.status(203).send({
                status: 1,
                message: '账号已存在'
            });
            return;
        }

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let ipcode = ip.replace(/::ffff:/g, "");
        const todayStart = new Date(new Date().toDateString()); // 当天开始时间
        const sqlCheckLog = 'SELECT * FROM reglogs WHERE ipcode = ? AND DATE(time) = DATE(?)';

        db.query(sqlCheckLog, [ipcode, todayStart], (err, logResults) => {
            if (err) {
                res.status(500).send({
                    status: 1,
                    message: '数据库查询错误'
                });
                return;
            }

            if (logResults.length > 0) {
                res.status(203).send({
                    status: 1,
                    message: '一天只能注册一个账号'
                });
                return;
            }

            // 加密密码
            reginfo.password = bcrypt.hashSync(reginfo.password, 10);
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)} ${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}:${('0' + now.getSeconds()).slice(-2)}`;
            // 插入注册日志
            const sqlInsertLog = 'INSERT INTO reglogs (account,ipcode, time) VALUES (?,?,?)';
            db.query(sqlInsertLog, [reginfo.account,ipcode,formattedDate], (err, logInsertResult) => {
                if (err) {
                    res.status(500).send({
                        status: 1,
                        message: '日志写入失败',
                        err
                    });
                    return;
                }
                // 插入用户信息
                const sqlInsertUser = 'INSERT INTO users (account, password, email, identity,image_url,permissions, member, create_time, status) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)';
                const identity = "2";
                const create_time = new Date();
                db.query(sqlInsertUser, [
                    reginfo.account,
                    reginfo.password,
                    reginfo.email,
                    identity,
                    "http://172.17.1.13:3000/images/tx/mrtx.webp",
                    "0101",
                    "默认会员",
                    create_time,
                    0 // 默认需要邮箱验证
                ], (err, userInsertResult) => {
                    if (err) {
                        res.status(500).send({
                            status: 1,
                            message: '注册账号失败'
                        });
                        return;
                    }

                    if (userInsertResult.affectedRows !== 1) {
                        res.status(203).send({
                            status: 1,
                            message: '注册账号失败，数据库未插入'
                        });
                        return;
                    }

                    res.send({
                        status: 0,
                        message: '注册账号成功,请查看邮件进行激活！'
                    });
                });
            });
        });
    });
});
router.post('/login', (req, res) => {
    const loginfo = req.body
    const sql = 'select * from users where account = ?'
    db.query(sql, loginfo.account, (err, results) => {
        const compareResult = bcrypt.compareSync(loginfo.password, results[0].password)
        if (err) {
            res.send({
                status: 1,
                massage: '查询失败',
                err
            })
        } else if (results.length !== 1) {
            res.send({
                status: 1,
                massage: '登录失败',
            })
        } else if (!compareResult) {
            res.send({
                status: 1,
                massage: '登录失败',
            })
        } else if (results[0].status == 0) {
            res.send({
                status: 1,
                massage: '账号被封啦！',
                identity: results[0].identity,
                status_time: results[0].status_time,
                thawed: results[0].thawed_time,
                sav: results[0].status,
                name: results[0].name,
            })
        } else {
            const user = {
                ...results[0],
                password: '',
                create_time: '',
                update_time: '',
            }
            const tokenKey = "exopda148sd148s"
            res.send({
                results: user,
                status: 0,
                message: '登录成功',
                token: tokenKey,
            })
        }
    })
});
router.post('/getuserInfo', (req, res) => {
    const sql = 'select * from users where id = ?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) {
            res.send({
                status: 1,
                massage: '查询失败',
                err
            })
        } else {
            const user = {
                ...results[0],
                password: '',
                create_time: '',
                update_time: '',
            }
            res.send(user)
        }
    })
})
router.get('/getuserskl', (req, res) => {
    sql = 'select COUNT(*) as aop from users where identity = 0'
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 1,
                massage: '查询失败',
                err
            })
        } else {
            const admin = results[0].aop
            sql = 'select COUNT(*) as aop from users where identity = 1'
            db.query(sql, (err, results) => {
                if (err) {
                    res.send({
                        status: 1,
                        massage: '查询失败',
                        err
                    })
                } else {
                    const teacher = results[0].aop
                    sql = 'select COUNT(*) as aop from users where identity = 2'
                    db.query(sql, (err, results) => {
                        if (err) {
                            res.send({
                                status: 1,
                                massage: '查询失败',
                                err
                            })
                        } else {
                            const user = results[0].aop
                            sql = 'select COUNT(*) as aop from users where identity = 3'
                            db.query(sql, (err, results) => {
                                if (err) {
                                    res.send({
                                        status: 1,
                                        massage: '查询失败',
                                        err
                                    })
                                } else {
                                    const xxgly = results[0].aop
                                    sql = 'select COUNT(*) as aop from most '
                                    db.query(sql, (err, results) => {
                                        if (err) {
                                            res.send({
                                                status: 1,
                                                massage: '查询失败',
                                                err
                                            })
                                        }
                                        const courses = results[0].aop
                                        res.send({
                                            status: 0,
                                            massage: '查询成功',
                                            data: [
                                                { text: "课程", num: courses },
                                                { text: "管理员", num: admin },
                                                { text: "讲师", num: teacher },
                                                { text: "学生", num: user },
                                                { text: "信息管理", num: xxgly }
                                            ],
                                            ecte: [
                                                {
                                                    "value": admin,
                                                    "name": "管理员"
                                                },
                                                {
                                                    "value": teacher,
                                                    "name": "讲师"
                                                },
                                                {
                                                    "value": user,
                                                    "name": "学生"
                                                },
                                                {
                                                    "value": xxgly,
                                                    "name": "信息管理"
                                                },
                                                {
                                                    "value": courses,
                                                    "name": "课程"
                                                }
                                            ]
                                        })
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})
module.exports = router;