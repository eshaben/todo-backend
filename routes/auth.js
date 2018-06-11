var express = require('express');
var router = express.Router();
const knex = require('../db/knex')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

require('dotenv').config()

router.post('/login', function(req, res, next) {
  let password = req.body.password
  let email = req.body.email
  let regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

  if (email.length === 0 || password.length === 0){
    res.json({error: "No email/password was entered. Please enter a valid email address and password."})
  } else if (!regex.test(email)) {
    res.json({error: "Please enter a valid email address."})
  } else {
    knex('account').select('*')
    .where('email', email)
    .then(user => {
      if(user.length === 0){
        res.json({error: "Email not found. Please sign up."})
      } else {
        let match = bcrypt.compareSync(password, user[0].password)
        if(match){
          let payLoad = user[0]
          delete payLoad.password

          res.json({token: jwt.sign(payLoad, process.env.TOKEN_SECRET)})
        } else {
          res.json({error: "Email and password do not match. Please try again."})
        }
      }
    })
  }
});

router.post('/signup', function(req, res, next) {
  let email = req.body.email
  let password = req.body.password

  knex('account').select('*')
  .where('email', email)
  .then(user => {
    if(user.length == 0){
      req.body.password = bcrypt.hashSync(password, 8);

      knex('account').insert(req.body).returning('*')
      .then(newUser => {
        let payLoad = newUser[0]
        delete payLoad.password;
        res.json({token: jwt.sign(payLoad, process.env.TOKEN_SECRET)});
      })
    } else {
      res.json({error: "Email already in use."})
    }
  })
});

module.exports = router;
