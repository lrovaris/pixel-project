const fs = require('fs');

async function save_file(name, data) {

  try {
    fs.writeFileSync(`${name}.json`, JSON.stringify(data), 'utf-8');

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

module.exports = { save_file };
