/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 16:56
 */
const {app, BrowserWindow} = require("electron");
const isDev = require("electron-is-dev");
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
});
