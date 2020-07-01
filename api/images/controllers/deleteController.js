const db = require('../db');
const fs = require('fs');

const { get_metadata_by_id } = require('./getController')

async function delete_metadata(meta_id) {
  const this_metadata = await get_metadata_by_id(meta_id)

  if(this_metadata === undefined){
    return {
      valid: false,
      message: "Metadados não encontrados no servidor"
    }
  }


  const images_dir = './uploads/images/'

  if(fs.existsSync(images_dir+this_metadata.path)){
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

    return{
        valid: false,
        message: "Ocorreu um erro ao deletar o arquivo, imagem inválida"
      }
  }

}


module.exports = {
  delete_metadata
};
