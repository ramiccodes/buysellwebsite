/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const productQueries = require("../db/queries/products");
const { getUserById } = require("../db/queries/users");
const router = express.Router();

// @desc Returns all products from database
// @route /api/product
// @query ?page=1
// @method GET

router.get("/", (req, res) => {
  let page = 0;

  // If query string exists then set page to selected page
  if (req.query.page) {
    page = Number(req.query.page);
  }

  productQueries
    .getProductsByPage(page)
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
  const { title, price, category, description, img } = req.body;
  const userId = req.session.user_id;

  if (!userId) {
    res.redirect("/auth/login", {
      isLoggedIn: userId,
      error: "Please login first before accessing this page.",
    });
  }

  // Error handling for creating post
  if (!title) {
    res.render("/product/create", { error: "Please provide title" });
  }

  if (!description) {
    res.render("/product/create", { error: "Please provide description" });
  }

  if (!img) {
    res.render("/product/create", { error: "Please provide image" });
  }

  if (!price) {
    res.render("/product/create", { error: "Please provide price" });
  }

  // If id was found, then search for user
  getUserById(userId)
    .then((user) => {
      // If id could not be associated with another user
      if (!user) {
        res.status(404).json({
          success: false,
          message: "Could not find user with id",
        });
      }

      // Check if user is not admin
      if (!user.is_admin) {
        res.status(404).json({
          success: false,
          message: "Not admin",
        });
      }

      return {
        title,
        price,
        category,
        description,
        img: img,
        user_id: user.id,
        is_sold: false,
      };
    })
    .then((data) => {
      return productQueries.addProduct(data);
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.redirect("/product/create");
    });
});

// @desc Deletes a product on the database
// @route /api/products/:id/delete
// @method POST

router.post("/:id/delete", (req, res) => {
  const productId = req.params.id;
  productQueries.deleteProduct(productId).then(() => {
    res.status(200).send("Product deleted!");
  });
});

// Need fixing
router.post("/:id/edit"),
  (req, res) => {
    // const productDetails = req.body;
    productQueries.editProduct(req.params.id).then((product) => {
      res.redirect("/product");
    });
  };

// @desc Marks a product as sold on the database
// @route /api/products/:id/sold
// @method POST
router.post("/:id/sold", (req, res) => {
  productQueries.markAsSold(req.params.id).then((product) => {
    console.log("Marked as Sold");
    res.redirect("/product");
  });
});

// @desc Marks a product as a user's favorite on the database
// @route /api/products/:id/favorite
// @method POST
router.post("/:id/favorite", (req, res) => {
  const userId = req.session["userId"];
  const itemId = req.params.id;
  productQueries.addFavorite(userId, itemId).then((product) => {
    console.log("Marked as Favorite");
    res.redirect("/product");
  });
});

// @desc Removes a product as a user's favorite on the database
// @route /api/products/:id/favorite/delete
// @method POST
router.post("/:id/favorite/delete", (req, res) => {
  const userId = req.session["userId"];
  const itemId = req.params.id;
  productQueries.removeFavorite(userId, itemId).then((product) => {
    console.log("Removed as Favorite");
    res.redirect("/product");
  });
});

module.exports = router;
