var express = require('express')
var proxy = require('http-proxy-middleware')
// 支持gzip压缩
var compression = require('compression')

var app = express()

// 开启gzip压缩
app.use(compression())

// static
app.use('/', express.static('./../dist'))

var options = {
  target: 'http://localhost:3000',  // 目标主机
  changeOrigin: true,  // 需要虚拟主机站点
}
var exampleProxy = proxy(options)  //开启代理功能，并加载配置
app.use('/', exampleProxy)  //对地址为’/‘的请求全部转发

// start server
var port = 10000
app.listen(port)
console.log('Running on http://localhost:' + port)
