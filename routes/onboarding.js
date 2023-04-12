/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  const isLoggedIn = req.session.user_id;

  // If logged in, don't let user go to signup page
  if (isLoggedIn) {
    res.redirect("/");
  }

  const templateVars = { isLoggedIn };
  res.render("signup", templateVars);
});

router.get("/login", (req, res) => {
  const isLoggedIn = req.session.user_id;

  // If logged in, don't let user go to login page
  if (isLoggedIn) {
    res.redirect("/");
  }

  const templateVars = { isLoggedIn };
  res.render("login", templateVars);
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
