/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUserById, getUsers, getUserFavorites, getUserListings } = require("../db/queries/users");

// @desc Gets all users from database
// @route /api/users
// @method GET

router.get("/", (req, res) => {
  getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// @desc Gets all of the user's listings from database
// @route /api/users/listings
// @method GET

router.get("/listings", (req, res) => {
  const userId = req.session["user_id"];
  getUserListings(userId)
    .then((listings) => {
      // res.render("listings") //SHOULD RENDER OUT A VIEW WHEN IT GETS MADE
      res.json({listings});
    })
    .catch((err) => {
      console.log("error", err)
      res.status(500).json({ error: err.message });
    });
})

// @desc Gets one user from database
// @route /api/users/:id
// @method GET

router.get("/:id", (req, res) => {
  const userId = req.params.id

  getUserById(userId)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// @desc Gets all of a user's favorite listings from the database
// @route /api/users/favorite
// @method GET

router.get("/favorite", (req, res) => {
  console.log("Hello run please thanks very much")
  console.log(req.session.user_id)
  
  const userId = req.session["user_id"];
  getUserFavorites(userId)
    .then((favorites) => {
      res.send(favorites); //SHOULD RENDER OUT A VIEW WHEN IT GETS MADE
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})

module.exports = router;
