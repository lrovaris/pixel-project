const fs = require('fs');

let recent_files;

function add_recent_file(path, type){

  recent_files = get_recent_files()

  const file_already_exists  = recent_files.find(file => file.path === path)

  if(file_already_exists !== undefined){
    return { valid: true }
  }

  recent_files.push({path: path, type: type})

  try {
    fs.writeFileSync('./recent_files.json', JSON.stringify(recent_files), 'utf-8');

    return { valid: true }
  }
  catch(e)
  {
    console.log(e);
    return { valid: false }
  }
}



function get_recent_files(){

  if(recent_files === undefined){
    return load_recent_files()
  }

  return recent_files;

}

function load_recent_files(){

  if (fs.existsSync('./recent_files.json')) {
    let _recent_files = fs.readFileSync('./recent_files.json')

    recent_files = JSON.parse(_recent_files)

    return recent_files;

  }else {

      fs.writeFileSync('./recent_files.json', JSON.stringify([]), 'utf-8');

      recent_files = []

      return recent_files;

  }

}

module.exports = {
  add_recent_file,
  get_recent_files
};
