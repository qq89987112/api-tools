const {app,BrowserWindow,getGlobal,setGlobal,globalShortcut} = require('electron')
let mainWindow;

global.baseURL = `http://localhost:3000`;
global.NODE_ENV = `development`;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
        webPreferences: {webSecurity: false}
    });

    mainWindow.loadURL(global.baseURL);

    if(global.NODE_ENV === `development`){
        //打开控制台
        mainWindow.webContents.openDevTools();
    }



    mainWindow.on('closed', () => {
        mainWindow = null;
        globalShortcut.unregisterAll()
    });
});

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
    if (mainWindow === null
    ) {
        createWindow();
    }
})
;

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.