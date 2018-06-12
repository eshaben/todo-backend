var express = require('express');
var router = express.Router();
const knex = require('../db/knex');

require('dotenv').config();

router.get('/:id', (req, res) => {
  knex('account')
  .where('id', req.params.id)
  .then(account => {
    res.json(account);
  })
});

module.exports = router;
