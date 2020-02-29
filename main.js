/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 16:56
 */
const {app, Menu} = require("electron");
const path=require("path");
const {ipcMain} = require("electron");//监听web page里发出的message
const isDev = require("electron-is-dev");
const menuTemplate=require("./src/config/menuTemplate");
const AppWindow = require("./src/AppWindow");
const Store = require("electron-store");
const settingStore = new Store({name:"Settings"});

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let mainWindow,settingWindow,menu;

app.on("ready", () => {
  app.setAboutPanelOptions({
    applicationName:"欧阳管理系统",
    applicationVersion:"1.0.0",
    version:"1.0.0",
    copyright:"版权所有@杨祎"
  });

  const mainWindowConfig = {
    width: 1024,
    height: 680
  };

  const urlLocation = isDev ? "http://localhost:3000/" : `file://${path.join(__dirname,'./build/index.html')}`;

  mainWindow = new AppWindow(mainWindowConfig,urlLocation);

  mainWindow.on("closed",()=>{
    mainWindow=null;
  });

  ipcMain.on("open-setting-window", () => {
    // 创建设置窗口
    const settingWindowConfig = {
      width: 500,
      height:400,
      parent:mainWindow
    };

    const settingFileLocation=`file://${path.join(__dirname,"./settings/settings.html")}`;
    settingWindow=new AppWindow(settingWindowConfig,settingFileLocation);
    // window 下隐藏菜单
    settingWindow.removeMenu();
    settingWindow.on("closed",()=>{
      settingWindow=null;
    });
  });

  ipcMain.on("config-is-saved", () => {
    let qiniuMenu = process.platform==="darwin"?menu.items[3]:menu.items[2];
    [1,2,3].forEach((key)=>{
      qiniuMenu.submenu.items[key].enabled=!!settingStore.get("settingMenuEnable");
    });
  });

  ipcMain.on("download", (event, path) => {
    //下面这句会触发will-download事件
    mainWindow.webContents.downloadURL(path);
  });

  menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
