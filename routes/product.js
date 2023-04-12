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
// @desc Renders all products made by user
// @method GET

router.get("/", (req, res) => {
  res.render("index");
});

// @route /product/:id
// @desc Show form for adding new post
// @method GET

router.get("/create", (req, res) => {
  res.render("create", isLoggedIn);
});

// @route /product/:id
// @desc Shows all info about product
// @method GET

router.get("/:id", (req, res) => {
  const productId = req.params.id;

  // Render out page using product and joined user info
  getProductWithUserById(productId)
    .then((product) => {
      console.log(product)
      res.render("product", product);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
