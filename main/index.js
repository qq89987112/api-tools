const {app,BrowserWindow,globalShortcut} = require('electron')
// require('./scripts/dev')

let mainWindow;

global.baseURL = `http://localhost:3000`;
global.NODE_ENV = `development`;

let createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
        // transparent: true,
        webPreferences: {webSecurity: false},
        // alwaysOnTop:true
    });
    global.mainWindow = mainWindow;
    global.__dirname = __dirname;
    // mainWindow.maximize();
    mainWindow.loadURL(`${global.baseURL}/#/`);
    // mainWindow.loadURL('http://www.501wan.com/start/2217.html');

    if(global.NODE_ENV === `development`){
        //打开控制台
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
        globalShortcut.unregisterAll()
    });
};
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd  Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
;

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
