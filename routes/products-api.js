/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


// ! Will replace with posts API routing

const express = require('express');
const router  = express.Router();
const productQueries = require('../db/queries/products');

router.get('/', (req, res) => {
  productQueries.getProducts()
    .then(products => {
      res.json({ products });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
