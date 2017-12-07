
const express = require('express');
const path = require('path');
const app = express();
/**
 * 在正式服务器上用来做代理的
 */
const proxy = require('http-proxy-middleware');

//context可以是单个字符串，也可以是多个字符串数组
const context = ['/api'];
//配置要代理到的接口地址，域名和ip都可以
const options = {
    target: 'http://127.0.0.1:8081',
    changeOrigin: true
}
//将options对象用proxy封装起来，作为参数传递
const apiProxy = proxy(options);
app.use(context, apiProxy)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8191);