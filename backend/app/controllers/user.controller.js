const { Router } = require("express");
const routes = new Router();
const User = require("../models/user");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

routes.post(`/users/login`, async (req, res) => {

  let erros = [];

  if(!req.body.email){
    erros.push("Dados incorretos");
  } 

  const user = await User.findOne({
    where: { email: req.body.email, password: req.body.password },
  });

  if(!user) {
    erros.push("Dados incorretos");
  }

  if(erros.length > 0){
    res.status(401).send({error: 'Dados incorretos'});
  }else{
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET,
      {
        expiresIn: 3600,
      }
    );
  
    res.send({
      user: user,
      token: token,
    });
  }  
});

module.exports = routes;
