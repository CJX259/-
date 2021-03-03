const express = require("express");
const port = 8080;
const app = express();
const path = require("path");
const staticPath = path.resolve(__dirname, "../public");
const cookieParser = require("cookie-parser");
let history = require('connect-history-api-fallback');
//需要写在定义静态资源前面

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//注意，此处处理路由方面的问题
//若没有这个则客户端在一个路由中刷新的时候会发送静态请求给服务端
// 服务端没有这个路径，则会报cannot found
// 设置了这个不会报cannot found，而是交回给客户端的默认页面来处理
// 由于客户端的页面有识别路由，则可以正常显示
app.use(history());

app.use(express.static(staticPath));

//给res添加cookie方法
app.use(cookieParser());


app.use(require('./tokenMiddleware'));

app.use("/api/user", require("./api/user"));
app.use("/api/admin", require('./api/admin'));
app.use("/api/teacher", require('./api/teacher'));
app.use("/api/std", require('./api/student'));
app.use("/api/course", require('./api/course'));

app.use(require('./errorMiddleware'));

app.listen(port, _ => {
    console.log("监听端口" + port);
});
exports.app = app;
