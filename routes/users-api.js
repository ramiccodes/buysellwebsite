/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUserById, getUsers } = require("../db/queries/users");

// @desc Gets all users from database
// @route /api/users
// @method POST

router.get("/", (req, res) => {
  getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// @desc Gets one user from database
// @route /api/users/:id
// @method POST

router.get("/:id", (req, res) => {
  const userId = req.params.id;

  getUserById(userId)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
