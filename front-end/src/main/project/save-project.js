const fs = require('fs');

async function save_project(name, data) {

  name = name.replace('.pxlproject','');

  if (!fs.existsSync('./projects')) {
    fs.mkdirSync('./projects')
  }

  if(!fs.existsSync(`./projects/${data.name}`)){
    fs.mkdirSync(`./projects/${data.name}`)
  }

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
