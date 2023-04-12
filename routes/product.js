/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const productQueries = require('../db/queries/products');

router.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  productQueries
    .getProductById(productId)
    .then((product) => {
      console.log(product)
      res.render("product", product);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
