/*
 * All routes for posts are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/my-favorites", (req, res) => {
  const isLoggedIn = req.session.user_id;

  // If logged in, don't let user go to signup page
  if (!isLoggedIn) {
    res.redirect("/auth/login");
  }

  const templateVars = { isLoggedIn };
  res.render("favorites", templateVars);
});

module.exports = router;