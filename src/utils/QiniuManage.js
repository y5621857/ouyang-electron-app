/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-25
 * Time: 17:21
 */
const qiniu = require("qiniu");
const axios =require("axios");
const fs = require("fs");

class QiniuManager {
  constructor(accessKey, secretKey, bucket) {
    // 创建各种上传凭证之前，我们需要定义好其中鉴权对象mac
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    this.bucket = bucket;

    // 构建配置类
    this.config = new qiniu.conf.Config();
    // 空间对应的机房
    this.config.zone = qiniu.zone.Zone_z0;

    // 下需要在拼接链接之前，将文件名进行urlencode以兼容不同的字符。
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
  }

  publicBucketDomain;

  /**
   * @author YangYi
   * @mail 229655153@qq.com
   * @description 上传文件
   * @param {String} key
   * @param {String} localFilePath
   * @return {Promise} 返回结果
   */
  uploadFile(key, localFilePath) {
    // 最简单的上传凭证只需要AccessKey，SecretKey和Bucket就可以。
    const options = {
      scope: this.bucket + ":" + key
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(this.mac);

    // 最简单的就是上传本地文件，直接指定文件的完整路径即可上传
    const formUploader = new qiniu.form_up.FormUploader(this.config);
    const putExtra = new qiniu.form_up.PutExtra();

    return new Promise((resolve, reject) => {
      // 文件上传
      formUploader.putFile(uploadToken, key, localFilePath, putExtra, this._handleCallBack(resolve, reject));
    });
  }

  /**
   * @author YangYi
   * @mail 229655153@qq.com
   * @description 删除文件
   * @param {string} key
   * @return {Promise} 返回结果
   */
  deleteFile(key) {
    return new Promise((resolve, reject) => {
      this.bucketManager.delete(this.bucket, key, this._handleCallBack(resolve, reject));
    });
  }

  /**
   * @author YangYi
   * @mail 229655153@qq.com
   * @description 获取七牛存储空间主机外联域名
   * @return {Promise} 返回结果
   */
  getBucketDomain(){
    const reqUrl = `http://api.qiniu.com/v6/domain/list?tbl=${this.bucket}`;
    const digest = qiniu.util.generateAccessToken(this.mac,reqUrl);
    return new Promise((resolve, reject)=>{
      qiniu.rpc.postWithoutForm(reqUrl,digest,this._handleCallBack(resolve,reject));
    });
  }

  /**
   * @author YangYi
   * @mail 229655153@qq.com
   * @description 获取文件路径
   * @param {string} key
   * @return {Promise} 返回结果
   */
  generateDownloadLink(key){
    const domainPromise=this.publicBucketDomain?Promise.resolve([this.publicBucketDomain]):this.getBucketDomain();
    return domainPromise.then(data=>{
      if(Array.isArray(data) && data.length>0){
        const pattern = /^http[s]?/;
        this.publicBucketDomain = pattern.test(data[0])?data[0]:`http://${data[0]}`;
        // 公开空间访问链接
        return this.bucketManager.publicDownloadUrl(this.publicBucketDomain,key);
      }else{
        throw Error("域名未找到，请查看储存空间是否过期！");
      }
    });
  }

  /**
   * @author YangYi
   * @mail 229655153@qq.com
   * @description 下载文件
   * @param {string} key
   * @param {string} downloadPath
   * @return {Promise} 返回结果
   */
  downloadFile(key, downloadPath) {
    // step 1 创建下载链接
    // step 2 创建可读流，创建可写流
    // step 3 将可读流写入可写流
    // step 4 完成后返回promise 结果
    return this.generateDownloadLink(key).then(link=>{
      const timeStamp = new Date().getTime();
      const url = `${link}?timestamp=${timeStamp}`;

      return axios({
        url,
        method:"GET",
        responseType:"stream",
        headers:{
          "Cache-Control":"no-cache"
        }
      });
    }).then(response=>{
      const write = fs.createWriteStream(downloadPath);
      response.data.pipe(write);

      return new Promise((resolve, reject)=>{
        write.on("finish",resolve);
        write.on("error",reject);
      });
    }).catch(err=>{
      return Promise.reject({err:err.response});
    });
  }

  _handleCallBack(resolve, reject) {
    return (respErr, respBody, respInfo) => {
      if (respErr) {
        reject({
          statusCode: respInfo.statusCode,
          body: respBody
        });
        //throw err;
      } else {
        resolve(respBody);
      }
    };
  }
}

module.exports = QiniuManager;

