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
// @route /api/products
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
// @route /api/products/:id
// @method GET

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  productQueries
    .getProductById(productId)
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// @desc Adds product into the database
// @route /api/products
// @method POST

router.post("/", (req, res) => {
  const { user_id, title, price, img, description, category, is_sold } =
    req.body;
  const productDetails = req.body;
  productQueries.addProduct(productDetails).then(() => {
    res.status(201).send("Product listed!");
  });
});

// @desc Deletes a product on the database
// @route /api/products/:id
// @method POST

router.post("/:id", (req, res) => {
  const productId = req.params.id;
  console.log("asdf", productId);
  productQueries.deleteProduct(productId)
  .then(() => {
    res.status(200).send("Product deleted!");
  })
})

module.exports = router;
