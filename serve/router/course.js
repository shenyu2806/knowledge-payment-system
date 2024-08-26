const express = require('express')
const db = require('../db/index.js')
const router = express.Router()
//获取数量
router.get('/setnum', (req, res) => {
sql="SELECT COUNT(*) as cop FROM most"
db.query(sql,(err, results) => {
    if(err){
        res.send({
            "meta": {
                "msg": "操作失败",
                "code": "201",
                "success": false,
                "version": "0.0.1",
                err
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
        },
        "data": {
            "count": results[0].cop
        }
    })
})
})
//获取课程列表
router.post('/mostNew', (req, res) => {
    const { 
        pageNum,
        pageSize,
    } = req.body;
    sql="SELECT * FROM most where  status = '1' ORDER BY createTime DESC  LIMIT ? OFFSET ?"
    const timestamp = new Date();
    db.query(sql,[pageSize,pageNum-1],(err, results) => {
        if(err){
            res.send({
                "meta": {
                    "msg": "操作失败",
                    "code": "201",
                    "success": false,
                    "version": "0.0.1",
                    "timestamp": timestamp,
                    err
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
        "pageInfo": {
            "startRow": 1,
            "navigatepageNums": [1],
            "list": results
        }
    }
   }) 
    });
   
});
//最热课程
router.post('/mostHeat', (req, res) => {
    const { pageNum,pageSize} = req.body;
    sql="SELECT * FROM most where isRecommend ='1' and status = '1' LIMIT ? OFFSET ?"
    const timestamp = new Date();
    db.query(sql,[pageSize,pageNum-1],(err, results) => {
        if(err){
            res.send({
                "meta": {
                    "msg": "操作失败",
                    "code": "201",
                    "success": false,
                    "version": "0.0.1",
                    "timestamp": timestamp,
                    err
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
        "pageInfo": {
            "startRow": 1,
            "navigatepageNums": [1],
            "list": results
        }
    }
   }) 
    });
})
//查询课程
router.post('/search', (req, res) => {
    const { 
        pageNum,
        pageSize,
        entity_firstCategory,//一级分类
        entity_secondCategory,//二级分类
        entity_tags,//知识点
        entity_isMember,//会员课程（传1）
        entity_isFree,//免费课程（传1）
        entity_courseLevel,//课程等级（1：初级；2：中级；3：高级）
        entity_sortBy//排序方式
    } = req.body;
    const timestamp = new Date();
    const sql = "SELECT * FROM most where isRecommend ='1' and status = '1' LIMIT ? OFFSET ?"
    if(entity_courseLevel){
        if(entity_sortBy){
            const sql = `SELECT * FROM most where courseLevel = ? ORDER BY ${req.body.entity_sortBy} DESC LIMIT ? OFFSET ? `
        db.query(sql,[entity_courseLevel,pageSize,pageNum-1],(err, results) => {
            if(err){
                res.send({
                    "meta": {
                        "msg": "操作失败",
                        "code": "201",
                        "success": false,
                        "version": "0.0.1",
                        "timestamp": timestamp,
                        err
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
            "pageInfo": {
                "startRow": 1,
                "navigatepageNums": [1],
                "list": results,
                "pageNum": pageNum,
            }
        }
       }) 
        });
        }else{
            const sql = `SELECT * FROM most where  courseLevel = ? LIMIT ? OFFSET ? `
        db.query(sql,[entity_courseLevel,pageSize,pageNum-1],(err, results) => {
            if(err){
                res.send({
                    "meta": {
                        "msg": "操作失败",
                        "code": "201",
                        "success": false,
                        "version": "0.0.1",
                        "timestamp": timestamp,
                        err
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
            "pageInfo": {
                "startRow": 1,
                "navigatepageNums": [1],
                "list": results,
                "pageNum": pageNum,
            }
        }
       }) 
        });
        }
    }else if(entity_isFree =="1"){
        const sql = `SELECT * FROM most where status = '1' and discountPrice = "0" LIMIT ? OFFSET ? `
        db.query(sql,[pageSize,pageNum-1],(err, results) => {
            if(err){
                res.send({
                    "meta": {
                        "msg": "操作失败",
                        "code": "201",
                        "success": false,
                        "version": "0.0.1",
                        "timestamp": timestamp,
                        err
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
            "pageInfo": {
                "startRow": 1,
                "navigatepageNums": [1],
                "list": results,
                "pageNum": pageNum,
            }
        }
       }) 
        });
    }else if(entity_isFree =="2"){
        const sql = `SELECT * FROM most where status = '1' and discountPrice = "0" ORDER BY ${req.body.entity_sortBy} DESC LIMIT ? OFFSET ? `
        db.query(sql,[pageSize,pageNum-1],(err, results) => {
            if(err){
                res.send({
                    "meta": {
                        "msg": "操作失败",
                        "code": "201",
                        "success": false,
                        "version": "0.0.1",
                        "timestamp": timestamp,
                        err
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
            "pageInfo": {
                "startRow": 1,
                "navigatepageNums": [1],
                "list": results,
                "pageNum": pageNum,
            }
        }
       }) 
        });
    }else if(entity_sortBy){
        const sql = `SELECT * FROM most where isRecommend ='1' and status = '1' ORDER BY ${req.body.entity_sortBy} DESC LIMIT ? OFFSET ? `
        db.query(sql,[pageSize,pageNum-1],(err, results) => {
            if(err){
                res.send({
                    "meta": {
                        "msg": "操作失败",
                        "code": "201",
                        "success": false,
                        "version": "0.0.1",
                        "timestamp": timestamp,
                        err
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
            "pageInfo": {
                "startRow": 1,
                "navigatepageNums": [1],
                "list": results,
                "pageNum": pageNum,
            }
        }
       }) 
        });
    }else if(entity_firstCategory){
         const sql = "SELECT * FROM most where firstCategoryName ? and status = '1' LIMIT ? OFFSET ?"
         db.query(sql,[entity_firstCategory,pageSize,pageNum-1],(err, results) => {
            if(err){
                res.send({
                    "meta": {
                        "msg": "操作失败",
                        "code": "201",
                        "success": false,
                        "version": "0.0.1",
                        "timestamp": timestamp,
                        err
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
            "pageInfo": {
                "startRow": 1,
                "navigatepageNums": [1],
                "list": results,
                "pageNum": pageNum,
            }
        }
       }) 
         });
    }else{
        db.query(sql,[pageSize,pageNum-1],(err, results) => {
            if(err){
                res.send({
                    "meta": {
                        "msg": "操作失败",
                        "code": "201",
                        "success": false,
                        "version": "0.0.1",
                        "timestamp": timestamp,
                        err
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
            "pageInfo": {
                "startRow": 1,
                "navigatepageNums": [1],
                "list": results,
                "pageNum": pageNum,
            }
        }
       }) 
        });
    }
})
//一级分类
router.get('/category/getFirstCategorys', (req, res) => {
    const timestamp = Date.now();
    const sql = "SELECT * FROM sort where status = '1' and parentId = '0'"
    db.query(sql,(err, results) => {
        if(err){
            res.send({
                "meta": {
                    "msg": "操作失败",
                    "code": "201",
                    "success": false,
                    "version": "0.0.1",
                    "timestamp": timestamp,
                    err
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
                "timestamp": "2021-10-10T09:23:26.028+0800"
            },
            "data":{
                "list": results
            }
        })
    })
})

//二级分类
router.post('/category/getSecondCategorys', (req, res) => {
    const {
        categoryId
    } = req.body;
    const timestamp = Date.now();
    const sql ="";
    if(categoryId != 0){
        const sql = "SELECT * FROM sort where status = '1' and parentId = ? "
        db.query(sql,[categoryId],(err, results) => {
            if(err){
                res.send({
                    "meta": {
                        "msg": "操作失败",
                        "code": "201",
                        "success": false,
                        "version": "0.0.1",
                        "timestamp": timestamp,
                        err
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
                    "timestamp": "2021-10-10T09:23:26.028+0800"
                },
                "data":{
                    "list": results
                }
            })
        })
    }else{
        const sql = "SELECT * FROM sort where status = '1' and parentId > 0"
        db.query(sql,[categoryId],(err, results) => {
            if(err){
                res.send({
                    "meta": {
                        "msg": "操作失败",
                        "code": "201",
                        "success": false,
                        "version": "0.0.1",
                        "timestamp": timestamp,
                        err
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
                    "timestamp": "2021-10-10T09:23:26.028+0800"
                },
                "data":{
                    "list": results
                }
            })
        })
    }
})
module.exports = router;