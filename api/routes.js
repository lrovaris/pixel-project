const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req,res) => {
  return res.status(200).json({"Message":"Funcionando"});
})

router.use('/images', require('./images/routes'));
router.use('/files', express.static(__dirname + '/uploads/images'));

module.exports = router;
