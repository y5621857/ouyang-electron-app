/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-25
 * Time: 10:42
 */
const {remote, ipcRenderer}=require("electron");
const Store =window.require("electron-store");
const settingStore = new Store({name:"Settings"});

const $ = (id)=>{
  return document.getElementById(id);
};

const closedWindowBtn = $("closedWindowBtn");
closedWindowBtn.addEventListener("click",()=>{
  settingStore.set("settingMenuEnable",true);

  ipcRenderer.send("config-is-saved");
  remote.getCurrentWindow().close();
});
