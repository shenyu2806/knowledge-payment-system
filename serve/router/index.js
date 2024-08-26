const express = require('express')
const sendEmail = require('../smtp/email');
const db = require('../db/index.js')
const router = express.Router()

// 主页路由
router.get('/', (req, res) => {
  res.send({
	  code:200,
	  msg:"一切正常"
  })
});

// GET请求案例
router.get('/name/:name', (req, res) => {
	const name = req.params.name; // 获取路由参数
	//const name = req.name; // 获取查询字符串作为对象
	res.send({
		name: "欢迎"+name
	});
});

//激活账号
router.get('/loginSet', (req, res) => {
	console.log(req.query);
	const {email,ops} = req.query;
	if (!email|!ops) {
        res.send({
            code: 203,
            msg: "缺少必要参数！"
        });
        return;
    }
	if(ops!='is6mxj0sfo4ekh5isjgsu'){
        res.send({
            code: 203,
            msg: "缺少必要参数！"
        });
        return;
    }
	sql = "update users set status = 1 where email= ?";
	db.query(sql, [email], (err, result) => {
		if (err) {
			res.send("<h1>激活失败,请联系管理员！</h1>")
		}
		res.send("<h1>激活成功,请返回登录</h1>")
	});
});
module.exports = router;