const {app,BrowserWindow} = require('electron')
app.on('ready', function(){
	let win = new BrowserWindow({width: 800, height: 600, frame: false})
	win.show()
});
