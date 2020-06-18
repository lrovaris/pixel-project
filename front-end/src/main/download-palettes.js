const got = require('got');
const fs = require('fs');

async function fetch_palette_info() {
  const palettes = await got('http://161.35.10.72:3000/colors/all');

  return palettes.body;
}

async function save_palette_json(palette_json) {
  try {
    fs.writeFileSync('palettes.json', JSON.stringify(palette_json), 'utf-8');

    return true
  }
  catch(e)
  {
    console.log(e);
    return false
  }
}

module.exports = {
  fetch_palette_info,
  save_palette_json
}
