const got = require('got');
const fs = require('fs');

const http = require('http');

async function fetch_metadata_info() {
  const metadata = await got('http://161.35.10.72:3000/images/all');

  return metadata.body;
}

async function save_metadata_json(metadata_json) {
  try {
    fs.writeFileSync('metadata.json', JSON.stringify(metadata_json), 'utf-8');


    return true
  }
  catch(e)
  {
    console.log(e);
    return false
  }
}

async function download_images(metadata) {

  for (var i = 0; i < metadata.length; i++) {
    let file = fs.createWriteStream(`./metadata/${metadata[i].path}`);

    let request = http.get(`http://161.35.10.72:3000/files/${metadata[i].path}`, function(response) {
      response.pipe(file);
    });
  }
}



module.exports = {
  fetch_metadata_info,
  save_metadata_json,
  download_images
}
