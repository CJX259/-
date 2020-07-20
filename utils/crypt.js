const secret = Buffer.from('yubtoonecgv441q4');
// node自带的加密算法
const crypto = require("crypto");
const iv = Buffer.from("oy02d094aeccsg7c");

module.exports.encrypt = function (str){
    const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
    let result = cry.update(str, "utf-8", "hex");
    result += cry.final("hex");
    return result;
}
module.exports.decrypt = function (str){
    const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
    let result = decry.update(str, "hex", "utf8");
    result += decry.final("utf8");
    return result;
}