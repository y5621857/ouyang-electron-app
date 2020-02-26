/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-25
 * Time: 10:42
 */
const {remote}=require("electron");
const $ = (id)=>{
  return document.getElementById(id);
};

const closedWindowBtn = $("closedWindowBtn");
closedWindowBtn.addEventListener("click",()=>{
  remote.getCurrentWindow().close();
});
