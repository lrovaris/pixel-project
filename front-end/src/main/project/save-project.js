const fs = require('fs');

async function save_project(name, data) {

  name = name.replace('.pxlproject','');

  try {
    fs.writeFileSync(`${name}.pxlproject`, JSON.stringify(data), 'utf-8');

    return {
      message: "Arquivo salvo com sucesso!"
    }
  }
  catch(e)
  {
    console.log(e);
    return {
      message: "Falha ao salvar arquivo"
    }
  }
}

module.exports = { save_project };
