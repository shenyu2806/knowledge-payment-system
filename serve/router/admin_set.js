const express = require('express')
const sendEmail = require('../smtp/email');
const db = require('../db/index.js')
const router = express.Router()

router.get('/all', (req, res) => {
    //查询setting
	sql="SELECT * FROM setting"
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({
                status: 1,
                msg: '数据库查询错误'
            });
            return;
        }
        res.send({
            status: 0,
            msg: '查询成功',
            results
        })
    })
});
router.post('/setwei', (req, res) => {
    const { name } = req.body;
    //查询setting
	sql="SELECT * FROM setting where name='"+name+"'";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({
                status: 1,
                msg: '数据库查询错误'
            });
            return;
        }
        res.send({
            status: 0,
            msg: '查询成功',
            results:results[0]
        })
    })
});

module.exports = router;