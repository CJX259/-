const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://www.jessyblog.cn:8080/',
    secure: false,
    changeOrigin: true,
  }))
}