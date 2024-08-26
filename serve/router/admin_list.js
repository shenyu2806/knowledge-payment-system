const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db/index.js');
const { json } = require('body-parser');
const router = express.Router()

/* 
用户数据
神月 24/8/24
*/
//查询用户数据
router.post('/getAdmingListLength', (req, res) => {
    const { identity, LIMIT, id } = req.body;
    //SELECT * FROM users where id > 79 and identity = 2 LIMIT 5
    sql = `SELECT * FROM users where id > ${id} and identity = ? LIMIT ${LIMIT}`
    db.query(sql, [identity], (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '查询失败',
                err
            })
        } else {
            if(result.length == 0){
                return res.send({
                    status: 2,
                    massage: '查询成功',
                    result: [{
                        account:""  
                    }],
                    length: result.length
                })
            }
            // 遍历结果数组，从每个对象中删除 'password' 属性
            result.forEach(user => {
                user.password = ""
            });
            res.send({
                status: 0,
                massage: '查询成功',
                result,
                length: result.length
            })
        }
    })
});
//查询用户数据 搜索
router.post('/getserteList', (req, res) => {
    const { identity, name } = req.body;
    sql = `SELECT * FROM users where identity = ? and name like '%${name}%' `
    db.query(sql, [identity], (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '查询失败',
                err
            })
        } else {
            // 遍历结果数组，从每个对象中删除 'password' 属性
            result.forEach(user => {
                delete user.password;
            });
            res.send({
                status: 0,
                massage: '查询成功',
                result,
                length: result.length
            })
        }
    })
});
//封号功能
router.post('/getsteruo', (req, res) => {
    const { id, time } = req.body;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)} ${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}:${('0' + now.getSeconds()).slice(-2)}`;
    const acc = time;
    // 一个小时是 60 * 60 * 1000 毫秒
    now.setTime(now.getTime() + acc * 60 * 60 * 1000);
    // 格式化输出时间（可选，根据需要格式化）
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    const time_ops = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate()} ${hours}:${minutes}:${seconds}`
    console.log(time_ops)
    sql = `update users set status = 0,update_time = "${formattedDate}" ,status_time = "${formattedDate}", thawed_time = "${time_ops}" where id = ?`
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '查询失败',
                err
            })
        } else {
            res.send({
                status: 0,
                massage: '操作成功',
            })
        }
    })
});
//解封功能
router.post('/posteruo', (req, res) => {
    const update_time = new Date()
    const { id } = req.body;
    sql = `update users set status = 1,update_time = ? where id = ?`
    db.query(sql, [update_time, id], (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '查询失败',
                err
            })
        } else {
            res.send({
                status: 0,
                massage: '操作成功',
            })
        }
    })
})
//删除用户
router.post('/deleteuser', (req, res) => {
    const { id } = req.body;
    sql = `delete from users where id = ?`
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '删除失败',
                err
            })
        } else {
            res.send({
                status: 0,
                massage: '操作成功',
            })
        }
    })
})
//会员等级搜索
router.get('/modexve', (req, res) => {
    sql = `select * from member`
    db.query(sql, (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '删除失败',
                err
            })
        } else {
            res.send({
                status: 0,
                massage: '操作成功',
                data: result
            })
        }
    })
})
//用户信息更新
router.post('/updeuser', (req, res) => {
    const update_time = new Date()
    const {
        id,
        account,
        identity,
        permissions,
        member,
        name,
        email,
        sex,
        image_url
    } = req.body;
    sql = `update users set ? where id = ${id}`
    db.query(sql, {
        id,
        account,
        identity,
        permissions,
        member,
        name,
        update_time,
        email,
        sex,
        image_url,
    }, (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '执行失败',
                err
            })
        } else {
            res.send({
                status: 0,
                massage: '操作成功',
                data: result
            })
        }
    })
})
//用户添加
router.post('/intouser', (req, res) => {
    const {
        account,
        identity,
        permissions,
        member,
        name,
        email,
        sex,
        image_url
    } = req.body;
    const sql = 'select * from users where account = ?'
    db.query(sql, account, (err, results) => {
        if (results.length > 0) {
            res.statusCode = 203;
            return res.send({
                status: 1,
                massage: '账号已存在'
            })
        }
    })
    sql1 = `insert into users set ? `
    const create_time = new Date()
    const password = bcrypt.hashSync("12345678", 10)
    db.query(sql1, {
        account,
        identity,
        permissions,
        member,
        name,
        email,
        sex,
        password,
        image_url,
        permissions: "0101",
        create_time,
        status: 1, //1为未冻结
    }, (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '添加失败',
                err
            })
        } else {
            res.send({
                status: 0,
                massage: '操作成功',
            })
        }
    })
})

/* 
课程数据
神月 24/8/24
*/
//查询课程数据
router.post('/getcoursesList', (req, res) => {
    const {
        LIMIT,
        id
    } = req.body;
    sql = `select * from most where id > ${id} LIMIT ${LIMIT}`
    db.query(sql, (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '查询失败',
                err
            })
        } else {
            result.forEach(user => {
                user.tags = JSON.parse(user.tags);
            });
            res.send({
                status: 0,
                massage: '查询成功',
                result,
                length: result.length
            })
        }
    })
});
//查询课程总数
router.get('/getcourseslegth', (req, res) => {
    sql = `select COUNT(*) as aop from most`
    db.query(sql, (err, result) => {
        if (err) {
            res.send({
                status: 1,
                massage: '查询失败',
                err
            })
        } else {
            res.send({
                status: 0,
                massage: '查询成功',
                length: result[0].aop
            })
        }
    })
});
module.exports = router;