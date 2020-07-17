const fs = require('fs');


async function load_project(dialog, callback) {

  let this_dialog = await dialog.showOpenDialog();

  if(!this_dialog.canceled){

    let filePath = this_dialog.filePaths[0];

    if (fs.existsSync(filePath)) {

      let project = fs.readFileSync(filePath)

      project = JSON.parse(project)

      callback({valid: true, project: project})

    }

  }else {
    
    callback({ valid: false })
  }

}

module.exports = { load_project };
