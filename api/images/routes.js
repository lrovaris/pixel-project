const express = require('express');
const router = express.Router();
const multer  = require('multer')

const controller = require('./controller');
const db = require('./db');

router.get ('/', (req,res) => {
  return res.status(200).json({"message":"Imagens funcionando"});
});

router.get ('/all', async(req,res) => {

  const img_metadata = await db.get_metadata();

  return res.status(200).json(img_metadata);
});

router.post('/new', async(req,res) => {

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

});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/images');
     },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        cb(null , uniqueSuffix+file.originalname);
    }
});

const upload = multer({ storage: storage })

router.post('/upload', upload.array('docs'), async(req,res) =>{
  if(!req.files){
    res.stats(400).json({ message: "Arquivos inválidos" })
  }

  let this_files = req.files.map(file_obj =>{
    return{
      nome: file_obj.originalname,
      path: file_obj.filename
    }
  })

  res.status(200).json({
    message: "Upload concluído!",
    info_files: this_files
  })
})



module.exports = router;
