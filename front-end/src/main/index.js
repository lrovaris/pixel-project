const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem
} = require('electron')
const url = require("url");
const path = require("path");

const download_metadata = require('./download-metadata');
const download_palette = require('./download-palettes')
const get_image = require('./get-image');
const { change_image_color } = require('./change-image-color')
const { save_file } = require('./save-sprite')

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
  );

appWindow.on('closed', function () {
    appWindow = null
  })
}

const template = [
   {
      label: 'File',
      submenu: [
         {
            label: 'Save',
            click() {
                    appWindow.webContents.send('save-sprite-command');
                }
         }
      ]
   },

   {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "F5",
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              // on reload, start fresh and close any old
              // open secondary windows
              if (focusedWindow.id === 1) {
                BrowserWindow.getAllWindows().forEach(win => {
                  if (appWindow.id > 1) appWindow.close();
                });
              }
              focusedWindow.reload();
            }
          }
        },
        {
          label: "Toggle Dev Tools",
          accelerator: "F12",
          click: () => {
            appWindow.webContents.toggleDevTools();
          }
        }
      ]
    }

]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

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

ipcMain.on("save-sprite", async(event, arg) =>{

  let save_action = await save_file(arg.name, arg.data)

  event.sender.send('save-sprite-reply', {
    message: save_action.message,
    name: arg.name
  })

})

ipcMain.on("load-palettes", async(event, arg) => {

  let palettes = await download_palette.fetch_palette_info()

  palettes = JSON.parse(palettes);

  event.sender.send('load-palettes-reply', palettes)

  let save_action = await download_palette.save_palette_json(palettes)
})

ipcMain.on("get-image", async(event, arg) =>{

  await get_image.get_local_image(arg, (image) => {
    event.sender.send('get-image-reply', image)
  });

})

ipcMain.on("change-color", async(event, arg) => {

  change_image_color(arg.path, arg.changes, (image) => {
    event.sender.send('change-color-reply', image)
  })

})
