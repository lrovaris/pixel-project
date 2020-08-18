const express = require('express');
const router = express.Router();

const controller = require('./controller');
const db = require('./db');

const md5 = require('md5');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./utils');

router.get ('/', (req,res) => {
  return res.status(200).json({"message":"Users funcionando"});
})

router.post('/login', async(req,res) => {

  let email = req.body.email

  if(email === undefined || email === ""){
    return res.status(400).json({"message": "Invalid email"})
  }

  let password = req.body.password

  if(password === undefined || password === ""){
    return res.status(400).json({"message": "Invalid password"})
  }

  let this_user = await controller.get_user_by_email(email)

  if(this_user === undefined){
    return res.status(401).json({"message": "This email doesn't match any account in our database"})
  }

  if(!(this_user.password === md5(password))){
    return res.status(401).json({"message":"The login credentials did not match, did you forget your your password?"});
  }

  let response_json = {
    "id":this_user._id,
    "email":this_user.email
  };

  let token = jwt.sign(response_json, "s3nh453Cr3T4d4Ap1", {"expiresIn": "1h"});

  res.status(200).json({
    "message":"Login efetuado com sucesso!",
    "token": token
  });
})

router.use(authenticate);

router.get ('/all', async(req,res) => {

  const all_users = await controller.get_users();

  return res.status(200).json(all_users);
})



module.exports = router;
