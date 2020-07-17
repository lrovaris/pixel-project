const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  dialog
} = require('electron')
const url = require("url");
const path = require("path");

const download_metadata = require('./download-metadata');
const download_palette = require('./download-palettes')
const get_image = require('./get-image');
const { change_image_color } = require('./change-image-color')
const { save_file } = require('./save-sprite')
const { load_sprite } = require('./load-sprite')
const { export_sprite } = require('./export-sprite')

let appWindow

function isDev() {
  return process.argv[2] == '--dev';
}

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
    isDev() ? "http://localhost:4200" : `file://${__dirname}/../../dist/index.html`
  );

appWindow.on('closed', function () {
    appWindow = null
  })
}



let view_menu = {
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

let file_menu = { label: 'File', submenu: [ ] }

let new_project_menu = { label: 'New Project', click() { appWindow.webContents.send('new-project-command'); } }

let load_sprite_menu = {
  label: 'Load',
  click() {

    load_sprite( dialog, (response) => {
      if(response.valid){
        appWindow.webContents.send('load-sprite-command', response.sprite);
      }
    })

  }
}

let save_sprite_menu = { label: 'Save', click() { appWindow.webContents.send('save-sprite-command'); } }

let export_sprite_menu = { label: 'Export', click() { appWindow.webContents.send('export-sprite-command'); } }



Menu.setApplicationMenu(getMenu('load'))

function getMenu(current_page) {

  let menu = [];

  file_menu.submenu = []


  if(
    current_page === 'management'
    || current_page === 'home'
  ){
    file_menu.submenu.push(new_project_menu)

  }

  if(current_page === 'character'
  || current_page === 'scenario'
  || current_page === 'ui'
  || current_page === 'enemy'
  || current_page === 'fx'
  || current_page === 'management'
){

  file_menu.submenu.push(load_sprite_menu)
  file_menu.submenu.push(save_sprite_menu)
  file_menu.submenu.push(export_sprite_menu)

}

menu.push(file_menu)

menu.push(view_menu)


return Menu.buildFromTemplate(menu)
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

  let save_action = await download_metadata.save_metadata_json(metadata)

  let download_action = await download_metadata.download_images(metadata, ()=>{
    event.sender.send('load-metadata-reply', metadata)
  })


})

ipcMain.on("save-sprite", async(event, arg) =>{

  let this_dialog = await dialog.showSaveDialog({
    defaultPath: "./projects/"
  });

  if(this_dialog.canceled){
    return event.sender.send('save-sprite-reply', {
      message: "Ocorreu um erro ao salvar",
      name: arg.name
    })
  }

  let path = this_dialog.filePath;

  let save_action = await save_file(path, arg.data)

  event.sender.send('save-sprite-reply', {
    message: save_action.message,
    name: arg.name
  })

})

ipcMain.on("export-sprite", async(event, arg) =>{

  const sprite = arg.sprite

  const params = arg.params

  const export_action = await export_sprite(params, sprite, (response) => {

    event.sender.send('export-sprite-reply', {
      message: response.message
    })

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

ipcMain.on("save-dialog", async(event, arg) =>{

  const this_dialog = await dialog.showSaveDialog({
    defaultPath: "./projects/"
  });

  if(this_dialog.canceled){
    return event.sender.send('save-dialog-reply', {
      valid: false
    })
  }

  const path = this_dialog.filePath;

  event.sender.send('save-dialog-reply', {
    valid: true,
    path: path
  })

})

ipcMain.on("navigate", async(event, arg) =>{

  Menu.setApplicationMenu(getMenu(arg))
})
