const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { addUser, getUserByEmail } = require("../db/queries/users");

// @desc Login user with cookie session
// @route /api/auth/
// @method POST

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(404).json({
      success: false,
    });
  }

  if (!password) {
    res.status(404).json({
      success: false,
    });
  }

  getUserByEmail(email)
    .then((user) => {
      // If no user is returned, then false
      if (!user) {
        res.status(404).json({
          success: false,
        });
      }

      // Compare encrypted password to input password
      const salt = bcrypt.compareSync(password, user.password);

      // If false, then return
      if (!salt) {
        return res.status(404).json({
          success: false,
        });
      }

      req.session.user_id = user.id;
      res.redirect("/product");
    })

    // Catch error on
    .catch((err) => {
      res.status(404).json({
        success: false,
      });
    });
});

// @desc Adds single user into the database, returns cookie session
// @route /api/auth/
// @method POST

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  addUser(username, email, hash)
    .then((user) => {
      req.session.user_id = user.id;
      res.redirect("/product");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// @desc Logout user by clearing cookie session
// @route /api/auth/
// @method POST

router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/product");
});

module.exports = router;
