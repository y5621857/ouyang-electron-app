/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-25
 * Time: 15:15
 * Desc: 七牛云上传测试
 */
const QiniuManage = require("./src/utils/QiniuManage");

// 创建各种上传凭证之前，我们需要定义好其中鉴权对象mac
const accessKey = "VrnNx0lMngIU6h1fYdC6fjodPCkzoD6tpETqhF61";
const secretKey = "gAR5STS3RkT0BS6Z_MQL55YsWvr3cevhYBiSbTsH";
const bucket = "ou-bucket-1";
const qiniuManage = new QiniuManage(accessKey,secretKey,bucket);

// 最简单的就是上传本地文件，直接指定文件的完整路径即可上传
// const localFile = "/Users/mac/Desktop/userTableTemplate.xlsx";
const key="userTableTemplate.xlsx";
// qiniuManage.uploadFile(key,localFile).then((data)=>{
//   console.log("上传成功！",data);
//   qiniuManage.deleteFile(key).then((data)=>{
//     console.log("删除成功！",data);
//   }).catch((err)=>{
//     console.log("删除失败",err);
//   });
// }).catch((err)=>{
//   console.log("上传失败",err);
// });
// qiniuManage.deleteFile(key);

// qiniuManage.getBucketDomain().then((data)=>{
//   console.log(data);
// });

qiniuManage.generateDownloadLink(key).then(data=>{
  console.log(data);
  return qiniuManage.generateDownloadLink("1.md");
}).then(data=>{
  console.log(data);
});
