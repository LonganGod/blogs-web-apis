const express = require('express');
const article_router = express.Router();

const path = require('path');
const conn = require('../tools/db');
const moment = require('moment');

article_router
// 获取文章列表
  .get('/api/article/getArticleList', (req, res) => {
    let sql1 = `select * from article a, articlecate ac where a.articleCate = ac.cateId order by a.createTime desc`;
    let sql2 = `select * from article a, articlecate ac where a.articleCate = ac.cateId and ac.cateId = ? order by createTime desc`;
    conn.query(req.query.cateId ? sql2 : sql1, [req.query.cateId], (err, result) => {
      if (err) {
        console.log(err);
        return res.send({code: 201, message: '数据获取失败'});
      }

      let newResult = []
      let startIndex = (Number(req.query.pageNum) - 1) * Number(req.query.articleNum)
      for (let i = startIndex; i < result.length; i++) {
        if (newResult.length < Number(req.query.articleNum) * Number(req.query.pageNum)) {
          newResult.push(result[i])
        }
      }

      return res.send({code: 200, message: '数据获取成功', result: newResult});
    })
  })

module.exports = article_router;