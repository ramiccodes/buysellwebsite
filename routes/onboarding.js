/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const { getUserById } = require("../db/queries/users");
const router = express.Router();

// @route /auth/signup
// @desc Shows form for registering users
// @method GET

router.get("/signup", (req, res) => {
  const isLoggedIn = req.session.user_id;

  // If logged in, don't let user go to signup page
  if (isLoggedIn) {
    res.redirect("/");
  }

  const templateVars = { isLoggedIn, error: null };
  res.render("signup", templateVars);
});

// @route /auth/login
// @desc Shows form for logging in users
// @method GET

router.get("/login", (req, res) => {
  const isLoggedIn = req.session.user_id;

  // If logged in, don't let user go to login page
  if (isLoggedIn) {
    res.redirect("/");
  }

  const templateVars = { isLoggedIn, error: null };
  res.render("login", templateVars);
});

// @route /auth/logout
// @desc Shows form for logging out users
// @method GET

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
