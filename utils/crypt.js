const secret = Buffer.from('yubtoonecgv441q4');
// node自带的加密算法
const crypto = require("crypto");
const iv = Buffer.from("oy02d094aeccsg7c");

module.exports.encrypt = function (str) {
    // 参数1 选用算法，参数2 key  参数3初始化向量
    const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
    // 对传入的str进行加密，更新到result, 传入的字符是utf-8，输出的是hex
    let result = cry.update(str, "utf-8", "hex");
    //结束加密过程，之后不能再进行加密, 返回加密的过程
    result += cry.final("hex");
    return result;
}
module.exports.decrypt = function (str) {
    const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
    let result = decry.update(str, "hex", "utf8");
    result += decry.final("utf8");
    return result;
}