const express = require("express");
const port = 80;
const app = express();
const path = require("path");
const staticPath = path.resolve(__dirname , "../public");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(staticPath));

//给res添加cookie方法
app.use(cookieParser());


app.use(require('./tokenMiddleware'));
app.use(require('./errorMiddleware'));

app.use("/api/user", require("./api/user"));
app.use("/api/admin", require('./api/admin'));
app.use("/api/teacher", require('./api/teacher'));
app.use("/api/std", require('./api/student'));
app.use("/api/course", require('./api/course'));


app.listen(port, _=>{
    console.log("监听端口" + port);
});
exports.app=app;