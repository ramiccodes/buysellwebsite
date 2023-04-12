/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const productQueries = require("../db/queries/products");

// @desc Returns all products from database
// @route /api/product
// @method GET

router.get("/", (req, res) => {
  productQueries
    .getProducts()
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// @desc Returns one product from database
// @route /api/product/:id
// @method GET

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  productQueries
    .getProductWithUserById(productId)
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// @desc Adds product into the database
// @route /api/product
// @method POST

router.post("/", (req, res) => {
  const { user_id, title, price, img, description, category, is_sold } =
    req.body;
  const productDetails = req.body;
  productQueries.addProduct(productDetails).then(() => {
    res.status(201).send("Product listed!");
  });
});

module.exports = router;
