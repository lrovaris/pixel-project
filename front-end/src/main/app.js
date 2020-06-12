const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const url = require("url");
const path = require("path");

const got = require('got');

let appWindow

function openModal(){
      const { BrowserWindow } = require('electron');
      let modal = new BrowserWindow({ parent: mainWindow, modal: true, show: false })
      modal.loadURL('http://161.35.10.72:3000/images/all')
      modal.once('ready-to-show', () => {
        modal.show()
      })
    }

async function initApp() {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Electron Build Path
  appWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `../../dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // Initialize the DevTools.
  appWindow.webContents.openDevTools()

  // const metadata = await got('http://161.35.10.72:3000/images/all');

  openModal()

  console.log(metadata.body);



  appWindow.on('closed', function () {
    appWindow = null
  })
}

app.on('ready', initApp)

// Close when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    initApp()
  }
})
