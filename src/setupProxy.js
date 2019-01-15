/**
 * 这里实现自定义接口代理
 */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/api', {
            target: 'http://127.0.0.1:8081',
            pathRewrite: {
                '^/api': '' //重写代理的路径，如http://localhost:8888/api/login会被代理到http://127.0.0.1:8081/login
            }
        })
    );
};
