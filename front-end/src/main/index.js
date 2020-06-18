const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const url = require("url");
const path = require("path");

const download_metadata = require('./download-metadata');
const get_image = require('./get-image');
const change_image_color = require('./change-image-color')

let appWindow

function initApp() {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Electron Build Path
  appWindow.loadURL(
    'http://localhost:4200'

    // url.format({
    //   pathname: path.join(__dirname, `../../dist/index.html`),
    //   protocol: "file:",
    //   slashes: true
    // })
  );

appWindow.on('closed', function () {
    appWindow = null
  })
}

app.on('ready', initApp)

app.on('activate', function () {
  if (win === null) {
    initApp()
  }
})

// Close when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// ipcMain things

ipcMain.on("load-metadata", async(event, arg) =>{

  let metadata = await download_metadata.fetch_metadata_info().catch(e =>{ console.log(e);});

  metadata = JSON.parse(metadata)

  event.sender.send('load-metadata-reply', metadata)

  let save_action = await download_metadata.save_metadata_json(metadata)

  let download_action = await download_metadata.download_images(metadata)

})

ipcMain.on("get-image", async(event, arg) =>{

  await get_image.get_local_image(arg, (image) => {
    event.sender.send('get-image-reply', image)
  });

})

ipcMain.on("change-color", async(event, arg) => {

  change_image_color(arg.path, arg.old_color, arg.new_color, (image) => {
    event.sender.send('change-color-reply', image)
  })

})
