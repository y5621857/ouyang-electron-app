/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-26
 * Time: 13:42
 */
const fs = require("fs");
const zlib = require("zlib");

const src = fs.createReadStream("./test.js");
const writeDec = fs.createWriteStream("./test.copy.gz");
// src.pipe(writeDec);
src.pipe(zlib.createGzip()).pipe(writeDec);
