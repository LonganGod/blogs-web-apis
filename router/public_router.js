const express = require('express')
const public_router = express.Router()

const path = require('path');
const conn = require('../tools/db');
const moment = require('moment');

public_router
// 获取文章列表
  .get('/api/frontdeskNav/getFrontdeskNavList', (req, res) => {
    let sql = 'select * from frontdesknav where navStatus = 1 order by navIndex'
    conn.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.send({code: 201, message: '数据获取失败'});
      }

      return res.send({code: 200, message: '数据获取成功', result: result});
    })
  })

module.exports = public_router;