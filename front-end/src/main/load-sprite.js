const fs = require('fs');


async function load_sprite(dialog, callback) {

  let this_dialog = await dialog.showOpenDialog();

  if(!this_dialog.canceled){

    let filePath = this_dialog.filePaths[0];

    console.log(filePath);

    if (fs.existsSync(filePath)) {

      let sprite = fs.readFileSync(filePath)

      sprite = JSON.parse(sprite)

      callback({valid: true, sprite: sprite})

    }



  }else {
    callback({ valid: false })
  }

}

module.exports = { load_sprite };
