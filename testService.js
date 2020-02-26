/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-26
 * Time: 11:33
 */
const fs = require("fs");
const server = require("http").createServer();

server.on("request",(req,res)=>{
  // 可读流替换直接全部加载文件，减轻服务器内存消耗
  const src = fs.createReadStream("./test.js");

  src.pipe(res);
});

server.listen(8000);
