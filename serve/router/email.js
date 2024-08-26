const express = require('express')
const sendEmail = require('../smtp/email');
const db = require('../db/index.js')
const bcrypt = require('bcryptjs')
const router = express.Router()
const crypto = require('crypto');

// 调用函数生成8位密码
function generateRandomPassword(length) {
    // 可能的字符集合
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let result = '';
    let charactersArray = characters.split('');
    for (let i = 0; i < length; i++) {
        result += charactersArray[Math.floor(Math.random() * charactersLength)];
    }
    return result;
}


// 测试邮件发送 ?email=admin@admin.com
router.get('/', (req, res) => {
    const email = req.query.email;
    if (email) {
        // 邮件选项
        let mailOptions = {
            from: '"团子网"tuzwyx@foxmail.com',
            to: email,
            subject: "测试邮件",
            placeholders: {
                // 模板中占位符的替换
                title: '测试邮件',
                tite: '爱学习网',
                name: '神月',
                text1: '你看到这封邮件，代表邮件服务配置正确啦！',
                text2: '这是一封测试邮件，请勿回复！',
                time: new Date().toLocaleString()
            }
        };
        // 发送邮件
        sendEmail(mailOptions).catch(err => {
            console.error('Failed to send email:', err);
        });
        res.send({
            email: "收件邮箱：" + email
        });
    } else {
        res.send({
            code: 203,
            msg: "缺少必要参数！"
        })
    }
});

// 忘记密码邮件发送
router.post('/resetpassword', (req, res) => {
    //const email = req.query.email; //get ?email=admin@admin.com
    const { email } = req.body;
    if (!email) {
        res.send({
            code: 203,
            msg: "缺少必要参数！"
        });
        return;
    }

    const repassword = generateRandomPassword(8);
    const respassword = bcrypt.hashSync(repassword, 10)
    const sqlUpdate = 'UPDATE users SET password = ? WHERE email = ?';
    db.query(sqlUpdate, [respassword, email], (err, result) => {
        if (err) {
            res.send({
                code: 203,
                msg: "出现错误",
                err
            });
            return;
        }
        if (result.affectedRows === 0) {
            res.send({
                code: 203,
                msg: "该邮箱没有账号！"
            });
            return;
        }
        // 邮件选项
        let mailOptions = {
            from: '"团子网"tuzwyx@foxmail.com',
            to: email,
            subject: "重置密码",
            placeholders: {
                // 模板中占位符的替换
                title: '重置密码',
                tite: '爱学习网',
                name: '',
                text1: '你的新密码是：' + repassword + ',请及时登录修改密码！',
                text2: '这是一封系统邮件，请勿回复！',
                time: new Date().toLocaleString()
            }
        };
        // 发送邮件
        sendEmail(mailOptions).catch(err => {
            console.error('Failed to send email:', err);
        });

        // 发送成功响应（可选，取决于你是否想立即响应客户端）
        res.send({
            code: 200,
            msg: "密码重置成功，邮件已发送"
        });

    });

});
// 激活账号邮件发送
router.post('/countemail', (req, res) => {
    const email = req.body.email;
    const ops ='is6mxj0sfo4ekh5isjgsu'
    //const { email } = req.body;
    if (!email|!ops) {
        res.send({
            code: 203,
            msg: "缺少必要参数！"
        });
        return;
    }
    const sqlUpdate = 'select * from users where email = ?';
    db.query(sqlUpdate, [email], (err, result) => {
        if (err) {
            res.send({
                code: 203,
                msg: "出现错误",
                err
            });
            return;
        }
        if (result.length < 1) {
            res.send({
                code: 203,
                msg: "该邮箱没有账号！"
            });
            return;
        }
        // 邮件选项
        let mailOptions = {
            from: '"团子网"tuzwyx@foxmail.com',
            to: email,
            subject: "启用账号",
            placeholders: {
                // 模板中占位符的替换
                title: '启用账号',
                tite: '爱学习网',
                name: '',
                text1: '你刚刚注册的账号需要激活，请点击下方的链接！<br><a href="http://172.17.1.13:3000/loginSet?email=' + email + '&ops='+ops+'">点击激活</a>',
                text2: '这是一封系统邮件，请勿回复！',
                time: new Date().toLocaleString()
            }
        };
        // 发送邮件
        sendEmail(mailOptions).catch(err => {
            console.error('Failed to send email:', err);
        });
        // 发送成功响应（可选，取决于你是否想立即响应客户端）
        res.send({
            code: 200,
            msg: "启用邮件已发送"
        });
    })
});

module.exports = router;