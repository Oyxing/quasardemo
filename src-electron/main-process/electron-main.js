import { app, BrowserWindow, ipcMain, dialog,session} from 'electron'
/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}
const path = require('path');
//用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
const electron = require('electron')
const nativeImage = require('electron').nativeImage
const ipc = electron.ipcMain
const Menu = electron.Menu;
const Tray = electron.Tray;
//托盘对象
var appTray = null;
let mainWindow
const gotTheLock = app.requestSingleInstanceLock()
const shell = require('electron').shell
var bool = true


function createWindow () {

  /**
   * Initial window options
   */
 //系统托盘图标目录
  let Windowico = nativeImage.createFromPath(path.join(path.join(__statics), '/img/server-favicon.ico'))
    mainWindow = new BrowserWindow({
      width: 670,
      height: 515,
      center: true,
      icon:Windowico,
      useContentSize: true,
      // 是否可调节大小
      resizable: true,
      //边框显示
      frame: false,

    })

      // 打开 开发者工具
    // mainWindow.webContents.openDevTools()

    mainWindow.once('ready-to-show', () => {
      mainWindow.show()
    })
    
    mainWindow.setFullScreenable(false)

    mainWindow.loadURL(process.env.APP_URL)
    mainWindow.on('closed', () => {
      mainWindow = null
    })
    // 关闭窗口 是 隐藏窗口
    mainWindow.on('close', (e) => {
      mainWindow.hide()  
      if(bool){
        e.preventDefault()
      }
    })
    mainWindow.setFullScreen(false)
    mainWindow.setMaximumSize(930, 610)
    mainWindow.focus()

    // 窗口最小化
    ipc.on('window-min',function(){
      mainWindow.minimize();
    })
    // 登录窗口
    ipcMain.on('login-window', () => {
      mainWindow.setSize(670, 515)
      mainWindow.center()
    })
    //  user 窗口
    ipcMain.on('user-window', () => {
      mainWindow.setSize(930, 610)
      mainWindow.center()
    })
    // 更改密码
    ipc.on('up-password',function(){
        var url = "http://idcyw.cn/home/index"
        shell.openExternal(url)
    })
    // VIP 开通
    ipc.on('href-vip',function(){
        var url = "http://idcyw.cn/home/vip"
        shell.openExternal(url)
    })
    // 隐藏
    ipc.on('window-hide',function(){
      mainWindow.hide();
    })
    ipcMain.on('open-directory-dialog', function (event,p) {
        dialog.showOpenDialog({
          properties: [p]
        },function (files) {
            if (files){// 如果有选中
              // 发送选择的对象给子进程
              event.sender.send('selectedItem', files[0])
            }
        })
      });
     
     
  //系统托盘右键菜单
      var trayMenuTemplate = [
          {
            icon: nativeImage.createFromPath(path.join(path.join(__statics),'/img/youbei.png')),
            label: '首页',
            click: function () {
            }
          },{
            type: 'separator'
          },{
            icon: nativeImage.createFromPath(path.join(path.join(__statics),'/img/youbei.png')),
            label: '柚备官网',
            click: function () {
              var url = "http://idcyw.cn/"
              shell.openExternal(url)
            }
        },{
          type: 'separator'
        },{
          icon:nativeImage.createFromPath(path.join(path.join(__statics), '/img/youbeiout.png')),
          label: '退出',
          click: function () {
              mainWindow.loadURL('http://localhost:8080/exit')
              setTimeout(()=>{
                  bool = false
                    app.quit();
                    app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
              },2000)
          }
        }
      ];
  appTray = new Tray(path.join(path.join(__statics),'/img/server-favicon.ico'));//app.ico是app目录下的ico文件

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('柚备');

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //单击右下角小图标显示应用
  appTray.on('click',function(){
    mainWindow.show();
  })
}


if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
  // 清除缓存
  app.commandLine.appendSwitch('--disable-http-cache');
  // Create myWindow, load the rest of the app, etc...
  app.on('ready', createWindow)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
