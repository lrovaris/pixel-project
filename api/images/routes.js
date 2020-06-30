const express = require('express');
const router = express.Router();
const multer  = require('multer')

const controller = require('./controller');
const db = require('./db');

router.get ('/', (req,res) => {
  return res.status(200).json({"message":"Imagens funcionando"});
})

router.get ('/all', async(req,res) => {

  const img_metadata = await controller.get_metadata();

  return res.status(200).json(img_metadata);
})

router.post ('/new', async(req,res) => {

  const metadata = req.body.metadata;
  const img_path = req.body.path;

  if(img_path === undefined){
    return res.status(400).json({ message: "Caminho para imagem inválido"})
  }

  if(metadata === undefined){
    return res.status(400).json({ message: "Metadados inválidos"})
  }

  let db_metadata = await db.register_metadata({ metadata: metadata, path: img_path }).catch(err => console.error(err));

  return res.status(200).json({message: "Registro de imagem bem-sucedido", metadados: db_metadata })

})

router.get("/:id", async(req,res) =>{
  const metadata_id = req.params.id

  if(metadata_id === undefined){
    return res.status(400).json({ message: "Metadados inválidos"})
  }

  const img_metadata = await controller.get_metadata_by_id(metadata_id);

  return res.status(200).json(img_metadata)
})

router.post("/:id", async(req,res) =>{
  const metadata_id = req.params.id

  if(metadata_id === undefined){
    return res.status(400).json({ message: "Metadados inválidos"})
  }

  const modifications = req.body

  if(modifications === undefined || modifications === null){
    return res.status(400).json({ message: "Modificações em branco" })
  }

  let edited_metadata =  await controller.edit_metadata(metadata_id, modifications);


  return res.status(200).json({ message: "Metadados editados com sucesso", metadata: edited_metadata })
})

router.delete("/:id", async(req,res) =>{
  const metadata_id = req.params.id

  if(metadata_id === undefined){
    return res.status(400).json({ message: "Metadados inválidos"})
  }

  let delete_action =  await controller.delete_metadata(metadata_id);

  if (!delete_action.valid){
      return res.status(400).json({message: delete_action.message})
  }else {
    return res.status(200).json({message: delete_action.message})
  }
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/images');
     },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        cb(null , uniqueSuffix+file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post ('/upload', upload.array('docs'), async(req,res) =>{
  if(!req.files){
    res.stats(400).json({ message: "Arquivos inválidos" })
  }

  let this_files = []

  let file_obj = req.files[0];

  await controller.get_metadata_from_image(file_obj.filename, (metadata) =>{

    let to_send = {
      nome: file_obj.originalname,
      path: file_obj.filename,
      metadata: metadata
    }

    res.status(200).json({
      message: "Upload concluído!",
      info_files: [ to_send ]
    })
  })
})

module.exports = router;
