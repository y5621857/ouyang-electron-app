/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-18
 * Time: 21:31
 */
const fs = window.require("fs").promises;

const fileHelper={
  dirCheck:(path)=>{
    return fs.access(path,(err)=>{
      //    文件和目录不存在的情况下；
      if(err && err.code === "ENOENT"){
        fs.mkdir(path);
      }
    });
  },
  readFile:(path)=>{
    return fs.readFile(path,{encoding: "utf8"});
  },
  writeFile:(path, content)=>{
    return fs.writeFile(path, content, {encoding: "utf8"});
  },
  renameFile:(path, newPath)=>{
    return fs.rename(path, newPath);
  },
  deleteFile:(path)=>{
    return fs.unlink(path);
  }
};

export default fileHelper;
