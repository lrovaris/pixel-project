const fs = require('fs');

async function save_sprite(name, data) {

  name = name.replace('.pxl','');

  try {
    fs.writeFileSync(`${name}.pxl`, JSON.stringify(data), 'utf-8');

    return {
      valid: true,
      path: `${name}.pxl`
    }
  }
  catch(e)
  {
    console.log(e);
    return {
      valid: false
    }
  }
}

module.exports = { save_sprite };
