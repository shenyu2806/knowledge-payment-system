const express = require('express')
const db = require('../db/index.js')
const router = express.Router()

// 主页路由
router.get('/', (req, res) => {
    res.send({
        code:200,
        msg:"这,都能发现！"
    })
  });
// 万能日志计入
router.post('/logs', (req, res) => {
    const { type,account,description} = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let ipcode = ip.replace("::ffff:", "");
    const time = new Date();
    const sql = "INSERT INTO logs set ?";
    db.query(sql,{
        time,
        type,
        account,
        ipcode,
        description
    },(err,result)=>{
        if(err){
            res.send({
                code:230,
                msg:"出现错误",
                err
            })
        }
            res.send({
                code:200,
                msg:"一切正常"
            })
    })
  });

// 万能日志获取
router.post('/getlogs', (req, res) => {
    const { type} = req.body;
    const sql = `select * from logs where type = '${type}' order by id desc`;
    db.query(sql,(err,result)=>{
        if(err){
            res.send({
                code:230,
                status:1,
                msg:"出现错误",
                err
            })
        }
        res.send({
            code:200,
            status:0,
            msg:"一切正常",
            result
        })
    })
  });
// 万能日志清空
router.post('/deletelogs', (req, res) => {
    const { type} = req.body;
    const sql = `delete from logs where type = '${type}'`;
    db.query(sql,(err,result)=>{
        if(err){
            res.send({
                code:230,
                status:1,
                msg:"出现错误",
                err
            })
        }
        res.send({
            code:200,
            status:0,
            msg:"一切正常",
            result
        })
    })
  });

module.exports = router;