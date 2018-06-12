const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

require('dotenv').config();

router.post('/', (req, res) => {
  knex('description').insert(req.body).returning('*')
  .then(description => {
    res.json(description)
  })
})

module.exports = router;
