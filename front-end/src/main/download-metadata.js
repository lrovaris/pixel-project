const got = require('got');
const fs = require('fs');

async function fetch_metadata_info() {
  const metadata = await got('http://161.35.10.72:3000/images/all');

  return metadata.body;
}

async function save_metadata_json(metadata_json) {
  try {
    fs.writeFileSync('metadata.json', metadata_json, 'utf-8');

    return true
  }
  catch(e)
  {
    console.log(e);
    return false
  }
}

async function download_images(metadata) {
  
}



module.exports = {
  fetch_metadata_info,
  save_metadata_json,
  download_images
}
