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
  console.log("finding");
  const this_metadata = await get_metadata_by_id(meta_id)

  if(this_metadata === undefined){
    return {
      valid: false,
      message: "Metadados não encontrados no servidor"
    }
  }

  console.log("exists");

  const images_dir = './uploads/images/'

  if(fs.existsSync(images_dir+this_metadata.path)){
    console.log("path exists");
    try {

      await db.delete_metadata(this_metadata._id)

      fs.unlinkSync(images_dir+this_metadata.path)

      return {
        valid: true,
        message: "Metadados deletados com sucesso"
      };


    } catch(err) {
      console.error(err)
      return{
          valid: false,
          message: "Ocorreu um erro ao deletar o arquivo"
        }
    }
  }else {
    console.log("this_metadata", this_metadata);

    console.log(images_dir+this_metadata.path + " does not exist");

    return{
        valid: false,
        message: "Ocorreu um erro ao deletar o arquivo, imagem inválida"
      }
  }

}


module.exports = {  get_metadata, delete_metadata };
