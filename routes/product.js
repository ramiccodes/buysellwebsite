/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getProductWithUserById } = require("../db/queries/products");

// @route /product
// @desc Shows all listing made by user
router.get("/product", (req, res) => {
  res.render("index");
});

// @route /product/:id
// @desc Shows all info about product
router.get("/product/:id", (req, res) => {
  const productId = req.params.id;

  // Render out page using product and joined user info
  getProductWithUserById(productId)
    .then((product) => {
      res.render("product", product);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
