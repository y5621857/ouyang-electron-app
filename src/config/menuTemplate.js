/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-22
 * Time: 16:05
 */
const {app, shell} = require("electron");

let memuTemplate = [
  {
    label: "文件",
    submenu:[
      {
        label: "新建",
        accelerator: "CmdOrCtrl+N",
        click: (menu, browserWindow, event) => {
          browserWindow.webContents.send("creat-new-file")
        }
      },
      {
        label: "保存",
        accelerator: "CmdOrCtrl+S",
        click: (menu, browserWindow, event) => {
          browserWindow.webContents.send("save-edit-file")
        }
      },
      {
        label: "搜索",
        accelerator: "CmdOrCtrl+F",
        click: (menu, browserWindow, event) => {
          browserWindow.webContents.send("search-file")
        }
      },
      {
        label: "导入",
        accelerator: "CmdOrCtrl+O",
        click: (menu, browserWindow, event) => {
          browserWindow.webContents.send("input-file")
        }
      }
    ]
  },
  {
    label: "编辑",
    submenu: [
      {
        label: "撤销",
        accelerator: "CmdOrCtrl+Z",
        role: "undo"
      },
      {
        label: "重做",
        accelerator: "CmdOrCtrl+Shift+Z",
        role: "redo"
      },
      {
        label: "剪切",
        accelerator: "CmdOrCtrl+X",
        role: "cut"
      },
      {
        label: "复制",
        accelerator: "CmdOrCtrl+C",
        role: "copy"
      },
      {
        label: "黏贴",
        accelerator: "CmdOrCtrl+V",
        role: "paste"
      },
      {
        label: "全选",
        accelerator: "CmdOrCtrl+A",
        role: "selectall"
      }
    ]
  },
  {
    label: "视图",
    submenu: [
      {
        label: "刷新当前窗口",
        accelerator: "CmdOrCtrl+R",
        click: (item, focusWindow) => {
          if (focusWindow) {
            focusWindow.reload();
          }
        }
      },
      {
        label: "全屏切换",
        accelerator: (() => {
          if (process.platform === "darwin") {
            return "Cmd+Ctrl+F";
          } else {
            return "F11";
          }
        })(),
        click: (item, focusWindow) => {
          if (focusWindow) {
            focusWindow.setFullScreen(!focusWindow.isFullWindow);
          }
        }
      },
      {
        label: "切换开发者工具",
        accelerator: (() => {
          if (process.platform === "darwin") {
            return "Alt+Cmd+I";
          } else {
            return "Ctrl+Shitf+I";
          }
        })(),
        click: (item, focusWindow) => {
          if (focusWindow) {
            focusWindow.toggleDevTools();
          }
        }
      }
    ]
  },
  {
    label:"窗口",
    submenu:[
      {
        label:"最小化",
        accelerator:"CmdOrCtrl+M",
        role:"minisize"
      },
      {
        label:"关闭",
        accelerator:"CmdOrCtrl+W",
        role:"close"
      },
      {
        label:"帮助",
        role:"help",
        submenu:[
          {
            label:"学习",
            click:()=>{shell.openExternal("https://www.baidu.com/")}
          }
        ]
      }
    ]
  }
];

if(process.platform==="darwin"){
  const name = app.name;
  memuTemplate.unshift(
    {
      label:name,
      submenu:[
        {
          label:`关于 ${name}`,
          role: "about"
        },
        {
          type:"separator"
        },
        {
          label:"服务",
          role: "services",
          submenu:[]
        },
        {
          type:"separator"
        },
        {
          label:`隐藏 ${name}`,
          accelerator:"Cmd+H",
          role: "hide",
        },
        {
          type:"separator"
        },
        {
          label:"隐藏其他",
          accelerator:"Cmd+Alt+H",
          role: "hideothers",
        },
        {
          type:"separator"
        },
        {
          label:"显示全部",
          role: "unhide",
        },
        {
          type:"separator"
        },
        {
          label:"退出",
          accelerator:"Cmd+Q",
          click:()=>{
            app.quit();
          }
        }
      ]
    }
  )
}

module.exports=memuTemplate;
