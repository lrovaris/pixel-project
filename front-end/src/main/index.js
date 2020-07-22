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

const { save_sprite } = require('./sprite/save-sprite')
const { load_sprite } = require('./sprite/load-sprite')
const { export_sprite } = require('./sprite/export-sprite')

const { load_project } = require ('./project/load-project')
const { save_project } = require ('./project/save-project')

const { add_recent_file, get_recent_files } = require ('./utils/recent-files')

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

let save_project_menu = { label: 'Save Project', click() { appWindow.webContents.send('save-project-command'); } }

let load_project_menu = {
  label: 'Load Project',
  click(){

    load_project( dialog, (response) => {
      if(response.valid){
        add_recent_file(response.path, "project", response.project.name)

        appWindow.webContents.send('load-project-command', {
          project: response.project,
          sprites: response.sprites
        });
      }
    })

  }
}

let load_sprite_menu = {
  label: 'Load Sprite',
  click() {

    load_sprite( dialog, (response) => {
      if(response.valid){
        appWindow.webContents.send('load-sprite-command', response.sprite);
      }
    })

  }
}

let save_sprite_menu = { label: 'Save Sprite', click() { appWindow.webContents.send('save-sprite-command'); } }

let export_sprite_menu = { label: 'Export Sprite', click() { appWindow.webContents.send('export-sprite-command'); } }

Menu.setApplicationMenu(getMenu('load'))

function getMenu(current_page) {

  let menu = [];

  file_menu.submenu = []


  if(
    current_page === 'management'
    || current_page === 'home'
  ){
    file_menu.submenu.push(new_project_menu)
    file_menu.submenu.push(load_project_menu)
    if(current_page !== 'home'){
      file_menu.submenu.push(save_project_menu)
    }
  }

  if(current_page === 'character'
  || current_page === 'management'
){

  file_menu.submenu.push(load_sprite_menu)
  if(current_page !== 'management'){

    file_menu.submenu.push(save_sprite_menu)
    file_menu.submenu.push(export_sprite_menu)
  }

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
    defaultPath: path.join(__dirname, `../../projects/${arg.projectName}`)
  });

  if(this_dialog.canceled){
    return event.sender.send('save-sprite-reply', {
      valid: false
    })
  }


  let save_action = await save_sprite(this_dialog.filePath, arg.data)

  event.sender.send('save-sprite-reply', {
    valid: save_action.valid,
    path: save_action.path
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


ipcMain.on("load-project", async(e,a) =>{

  load_project( dialog, (response) => {
    if(response.valid){
      add_recent_file(response.path, "project")

      appWindow.webContents.send('load-project-command', {
        project: response.project,
        sprites: response.sprites
      });
    }
  })

})

ipcMain.on("load-recent-project", async(e,a) =>{

  load_project_by_path(path, (response) => {

    if(response.valid){
      add_recent_file(response.path, "project", response.project.name)

      appWindow.webContents.send('load-project-command', {
        project: response.project,
        sprites: response.sprites
      });
    }

  })

})


ipcMain.on("save-project", async(event, arg) =>{

  // let this_dialog = await dialog.showSaveDialog({
    //   defaultPath: "./projects/"
    // });
    //
    // if(this_dialog.canceled){
      //   return event.sender.send('save-project-reply', {
        //     message: "Ocorreu um erro ao salvar"
        //   })
        // }
        //
        // let path = this_dialog.filePath;

        let save_action = await save_project(`./projects/${arg.name}`, arg)

        event.sender.send('save-project-reply', {
          message: save_action.message
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



      ipcMain.on("get-recent-files", async(e,a) =>{

        let recent_files = get_recent_files()

        appWindow.webContents.send('get-recent-files-command', {
          files: recent_files
        });

      })
