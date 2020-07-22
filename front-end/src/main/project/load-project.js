const fs = require('fs');

const { get_sprite_data } = require('../sprite/load-sprite')

async function load_project(dialog, callback) {

  let this_dialog = await dialog.showOpenDialog();

  if(!this_dialog.canceled){

    load_project_by_path(this_dialog.filePaths[0], callback)

  }else {

    callback({ valid: false })
  }

}

function load_project_by_path(_path, callback){

    let filePath = _path

    if (fs.existsSync(filePath)) {

      let project = fs.readFileSync(filePath)

      project = JSON.parse(project)

      let sprites = []

      if(project.sprites !== undefined){
        for (var i = 0; i < project.sprites.length; i++) {

          let sprite_data = get_sprite_data(project.sprites[i])

          sprites.push(sprite_data)

        }
      }

      callback({
        valid: true,
        project: project,
        sprites: sprites,
        path: filePath
      })

    }else {
      callback({valid:false})
    }

}

module.exports = { load_project, load_project_by_path };
