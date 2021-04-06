const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win, dev=false;

if(process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development'){
	dev=true
}

const createWindow = () => {
	win = new BrowserWindow({
		title: 'Boilerplate',
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	})

	let indexPath;

	if (dev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true
		})
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true
		})
	}


	win.loadURL(indexPath)

	win.on('ready-to-show', () => win.show())
	win.on('closed', () => win=null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
		app.quit();
});

app.on('activate', () => {
	if(win===null)
		createWindow()
})