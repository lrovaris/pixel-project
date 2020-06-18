const express = require('express');
const router = express.Router();

const controller = require('./controller');
const db = require('./db');

router.get ('/', (req,res) => {
  return res.status(200).json({"message":"Cores funcionando"});
})

router.get ('/all', async(req,res) => {

  const color_palletes = await controller.get_color_palletes();

  return res.status(200).json(color_palletes);
})

router.post ('/new', async(req,res) => {

  const colors = req.body.colors;

  if(colors === undefined){
    return res.status(400).json({ message: "Cores não enviadas"})
  }

  const name = req.body.name;

  if(name === undefined){
    return res.status(400).json({ message: "Nome inválido"})
  }

  let db_color_pallete = await db.register_color_pallete({ name: name, colors: colors }).catch(err => console.error(err));

  return res.status(200).json({message: "Registro da paleta de cores bem-sucedido", colors: db_color_pallete })
})

router.delete("/:id", async(req,res) =>{
  const pallete_id = req.params.id

  if(pallete_id === undefined){
    return res.status(400).json({ message: "Paleta inválida"})
  }

  let delete_action =  await db.delete_color_pallete(pallete_id);

  return res.status(200).json({ message: "Paleta deletada com sucesso" })
})


module.exports = router;
