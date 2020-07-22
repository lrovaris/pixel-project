const fs = require('fs');


async function load_sprite(dialog, callback) {

  let this_dialog = await dialog.showOpenDialog();

  if(!this_dialog.canceled){

    let filePath = this_dialog.filePaths[0];

    if (fs.existsSync(filePath)) {

      let sprite = get_sprite_data(filePath)

      callback({
        valid: true,
        sprite: sprite,
        path: filePath
      })

    }



  }else {
    callback({ valid: false })
  }

}

function get_sprite_data(path) {
  let sprite = fs.readFileSync(path)

  sprite = JSON.parse(sprite)

  return sprite;
}

module.exports = { load_sprite, get_sprite_data };
