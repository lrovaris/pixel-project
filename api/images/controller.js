const db = require('./db');
let cache = require('../memoryCache');

const fs = require('fs');

async function get_metadata() {
  return cache.get('images') || await db.get_metadata();
}

async function get_metadata_by_id(meta_id) {

  let all_metadata = await get_metadata();

  let this_metadata = all_metadata.find(meta_obj => meta_obj._id.toString() === meta_id.toString())

  return this_metadata;
}

async function delete_metadata(meta_id) {
  const this_metadata = await get_metadata_by_id(meta_id)

  if(this_metadata === undefined){
    return {
      valid: false,
      message: "Metadados não encontrados no servidor"
    }
  }

  const images_dir = './uploads/images/'

  return {
    valid: true,
    message: "Metadados deletados com sucesso"
  };


  if(fs.existsSync(images_dir+this_metadata.path)){
    try {
      fs.unlinkSync(images_dir+this_metadata.path)

      // dps de excluir, colocar a nova foto no perfil e fazer update no banco de dados
      // responder com a resposta do banco de dados
      return {
        valid: true,
        message: "Metadados deletados com sucesso"
      };


    } catch(err) {
      console.error(err)
      return{
          valid: false,
          message: "Ocorreu um erro ao atualizar sua foto"
        }
    }
  }

}


module.exports = {  get_metadata, delete_metadata };
