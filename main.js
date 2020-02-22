/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 16:56
 */
const {app, BrowserWindow, Menu} = require("electron");
const {ipcMain} = require("electron");//监听web page里发出的message
const isDev = require("electron-is-dev");
const menuTemplate=require("./src/config/menuTemplate");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const urlLocation = isDev ? "http://localhost:3000/" : "";

  mainWindow.loadURL(urlLocation);

  ipcMain.on("download", (event, path) => {
    //下面这句会触发will-download事件
    mainWindow.webContents.downloadURL(path);
  });

  app.setAboutPanelOptions({
    applicationName:"欧阳管理系统",
    applicationVersion:"1.0.0",
    version:"1.0.0",
    copyright:"版权所有@杨祎"
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
