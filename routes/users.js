/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/listing", (req, res) => {
  const isLoggedIn = req.session.user_id;

  // If logged in, don't let user go to signup page
  if (!isLoggedIn) {
    res.redirect("/auth/login", {error: "Please login first to view your listing"});
  }

  const templateVars = { isLoggedIn: req.session.user_id };
  res.render("user-listing", templateVars);
});


router.get("/favorites", (req, res) => {
  const isLoggedIn = req.session.user_id;

  // If logged in, don't let user go to signup page
  if (!isLoggedIn) {
    res.redirect("/auth/login", {error: "Please login first to view your favorites"});
  }

  const templateVars = { isLoggedIn };
  res.render("favorites", templateVars);
});


module.exports = router;
