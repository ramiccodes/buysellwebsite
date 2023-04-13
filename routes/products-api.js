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
  const { page, min, max, category } = req.query;

  // Set default options
  const options = {
    page: 0,
  };

  // If query string exists then set page to selected page
  if (page >= 0 || page) {
    options.page = Number(page);
  }

  // If query string exists then set page to selected page
  if (min) {
    options.min = min;
  }

  // If query string exists then set page to selected page
  if (max) {
    options.max = max;
  }

  // If query string exists then set page to selected page
  if (category) {
    options.max = max;
  }

  productQueries
    .getProducts(options)
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
    res.render("create", { isLoggedIn: userId, error: "Please provide title" });
  }

  if (!description) {
    res.render("create", {
      isLoggedIn: userId,
      error: "Please provide description",
    });
  }

  if (!img) {
    res.render("create", { isLoggedIn: userId, error: "Please provide image" });
  }

  if (!price) {
    res.render("create", { isLoggedIn: userId, error: "Please provide price" });
  }

  // If id was found, then search for user
  getUserById(userId)
    .then((user) => {
      // If id could not be associated with another user
      if (!user) {
        res.render("login", {
          isLoggedIn: false,
          error: "Not authorized to view page",
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
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      res.redirect("create", {
        isLoggedIn: userId,
        error: "Please provide price",
      });
    });
});

// @desc Deletes a product on the database
// @route /api/products/:id/delete
// @method POST

router.delete("/:id/delete", (req, res) => {
  const productId = req.params.id;
  productQueries.deleteProduct(productId).then(() => {
    res.status(200).json({ message: "Product deleted!" });
  });
});

router.post("/:id/edit", (req, res) => {
  const { title, price, img, description, category, is_sold } = req.body;
  const productDetails = req.body;
  productQueries.editProduct(req.params.id, productDetails).then((product) => {
    res.redirect("/product");
  });
});

// @desc Marks a product as sold on the database
// @route /api/products/:id/sold
// @method POST

router.put("/:id/sold", (req, res) => {
  const { id } = req.params;
  const { is_sold } = req.body;

  productQueries
    .markAsSold(id, is_sold)
    .then((product) => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err });
    });
});

// @desc
// Checks if the user already has the product marked as a favorite on the database and returns true or false
// If FALSE: Adds a product as a user's favorite on the database
// If TRUE: Removes a product as a user's favorite on the database
// @route /api/products/:id/favorite
// @method POST

router.post("/:id/favorite", (req, res) => {
  const userId = req.session["user_id"];
  const itemId = req.params.id;
  productQueries.checkFavorite(userId, itemId)
  .then(favorite => {
    if (favorite.rows[0].case === 'False') {
      productQueries.addFavorite(userId, itemId).then((product) => {
        console.log("Added to Favorites");
        res.redirect("/product");
      });
    }
    if (favorite.rows[0].case === 'True') {
      productQueries.removeFavorite(userId, itemId).then((product) => {
        console.log("Removed from Favorites");
        res.redirect("/product");
      });
    }
  })
})

module.exports = router;
