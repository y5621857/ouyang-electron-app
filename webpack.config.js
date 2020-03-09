/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-03-06
 * Time: 09:07
 */
const path = require("path");

module.exports = {
  target: "electron-main",
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "main.js"
  },
  node: {
    __dirname: false // 根目录设置为相对路径
  }
};
