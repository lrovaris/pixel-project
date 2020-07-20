const fs = require('fs');


const { get_sprite_data } = require('../load-sprite')

async function load_project(dialog, callback) {

  let this_dialog = await dialog.showOpenDialog();

  if(!this_dialog.canceled){

    let filePath = this_dialog.filePaths[0];

    if (fs.existsSync(filePath)) {

      let project = fs.readFileSync(filePath)

      project = JSON.parse(project)

      let sprites = []

      for (var i = 0; i < project.sprites.length; i++) {

        let sprite_data = get_sprite_data(project.sprites[i])

        sprites.push(sprite_data)

      }

      callback({valid: true, project: project, sprites: sprites})

    }

  }else {

    callback({ valid: false })
  }

}

module.exports = { load_project };
