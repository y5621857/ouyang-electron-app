/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 16:56
 */
const {app, Menu, dialog} = require("electron");
const {autoUpdater} = require("electron-updater");
const log = require("electron-log");
const path = require("path");
const {ipcMain} = require("electron");//监听web page里发出的message
const isDev = require("electron-is-dev");
const menuTemplate = require("./src/config/menuTemplate");
const AppWindow = require("./src/AppWindow");
const Store = require("electron-store");
const settingStore = new Store({name: "Settings"});

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let mainWindow, settingWindow, menu;

app.on("ready", () => {
  // 修改日志记录的格式
  log.transports.console.format =
    "[{h}:{i}:{s}.{ms}] [{level} {processType}] › {text}";
  log.transports.file.format =
    "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";
  
  log.transports.file.fileName = "ouyang-app-electron.log";
  log.debug("test log");
  
  if (isDev) {
    autoUpdater.updateConfigPath = path.join(__dirname, "dev-app.update.yml");
  }
  
  autoUpdater.autoDownload = false;
  if (isDev) {
    autoUpdater.checkForUpdates();
  } else {
    autoUpdater.checkForUpdatesAndNotify();
  }
  
  // 更新失败
  autoUpdater.on("error", (error) => {
    console.log("更新异常", error);
    dialog.showErrorBox("更新异常", error === null ? "unknown" : (error.stackTotal));
  });
  
  // 检查更新
  autoUpdater.on("checking-for-update", () => {
    console.log("检查更新");
  });
  
  // 有新版本
  autoUpdater.on("update-available", (UpdateInfo) => {
    dialog.showMessageBox({
      type: "info",
      title: "有新版本",
      message: `发现新版本(${UpdateInfo.version})，是否现在更新？`,
      buttons: ["否", "是"]
    }).then(({response}) => {
      if (response === 1) {
        autoUpdater.downloadUpdate();
      }
    });
  });
  
  // 下载进度
  autoUpdater.on("download-progress", (progressObj) => {
    let logMsg = `下载速度：${progressObj.bytesPerSecond}`;
    logMsg += `，下载进度：${progressObj.percent.toFixed(2)}%`;
    logMsg += `(${progressObj.transferred}/${progressObj.total})`;
    log.info(logMsg);
  });
  
  // 下载完成
  autoUpdater.on("update-downloaded", (progressObj) => {
    dialog.showMessageBox({
      title: "安装更新",
      message: "更新下载完成，应用将重新启动并进行安装"
    }).then(() => {
      setTimeout(() => autoUpdater.quitAndInstall(), 500);
    });
  });
  
  // 没有更新
  autoUpdater.on("update-not-available", () => {
    dialog.showMessageBox({
      title: "没有新版本",
      message: "当前已是最新版本"
    });
  });
  
  // app.setAboutPanelOptions({
  //   applicationName: "欧阳管理系统",
  //   applicationVersion: "1.0.0",
  //   version: "1.0.0",
  //   copyright: "版权所有@杨祎"
  // });
  
  const mainWindowConfig = {
    width: 1024,
    height: 680
  };
  
  // 生成环境用webpack打包出来的压缩优化的文件main.js，在./build/目录下
  const urlLocation = isDev ? "http://localhost:3000/" : `file://${path.join(__dirname, "./index.html")}`;
  
  mainWindow = new AppWindow(mainWindowConfig, urlLocation);
  
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  
  ipcMain.on("open-setting-window", () => {
    // 创建设置窗口
    const settingWindowConfig = {
      width: 500,
      height: 400,
      parent: mainWindow
    };
    
    const settingFileLocation = `file://${path.join(__dirname, "./settings/settings.html")}`;
    settingWindow = new AppWindow(settingWindowConfig, settingFileLocation);
    // window 下隐藏菜单
    settingWindow.removeMenu();
    settingWindow.on("closed", () => {
      settingWindow = null;
    });
  });
  
  ipcMain.on("config-is-saved", () => {
    let qiniuMenu = process.platform === "darwin" ? menu.items[3] : menu.items[2];
    [1, 2, 3].forEach((key) => {
      qiniuMenu.submenu.items[key].enabled = !!settingStore.get("settingMenuEnable");
    });
  });
  
  ipcMain.on("download", (event, path) => {
    //下面这句会触发will-download事件
    mainWindow.webContents.downloadURL(path);
  });
  
  menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
