const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { addUser, getUserByEmail } = require("../db/queries/users");

// @desc Login user with cookie session
// @route /api/users/
// @method POST

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(404).json({
      success: false,
    });
  }

  getUserByEmail(email).then((user) => {
    const salt = bcrypt.compareSync(password, user.password);

    if (!salt) {
      return res.status(404).json({
        success: false,
      });
    }

    res.redirect("/product");
  });
});

// @desc Adds single user into the database, returns cookie session
// @route /api/users/
// @method POST

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  addUser(username, email, hash)
    .then((user) => {
      res.redirect("/product");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
