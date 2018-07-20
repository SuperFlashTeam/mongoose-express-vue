'use strict'
const mongoose = require('mongoose')
// 连接mongodb
mongoose.connect('mongodb://localhost/urldata')
// 实例化连接对象
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('urldata连接成功！！')
})
// 创建schema
const devMsgSchema = new mongoose.Schema({
    projectName: String,
    url: String,
    name: String
})
// 创建model
const devMsgModel = mongoose.model('newDevMsg', devMsgSchema) // newClass为创建或选中的集合

module.exports = devMsgModel