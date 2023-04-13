const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { addUser, getUserByEmail, getUserById } = require("../db/queries/users");

// @desc Login user with cookie session
// @route /api/auth/
// @method POST

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // If no email was provided
  if (!email) {
    res.render("login", {
      isLoggedIn: false,
      error: "Please enter your email",
    });
  }

  // If no password was provided
  if (!password) {
    res.render("login", {
      isLoggedIn: false,
      error: "Please enter your password",
    });
  }

  getUserByEmail(email)
    .then((user) => {
      // If no user is returned
      if (!user) {
        res.render("login", { isLoggedIn: false, error: "User not found." });
      }

      // Compare encrypted password to input password
      const salt = bcrypt.compareSync(password, user.password);

      // If compared password doesn't match, then return relevant message
      if (!salt) {
        res.render("login", { isLoggedIn: false, error: "Incorrect password" });
      }

      // If all checks passes, then login user with provided user
      req.session.user_id = user.id;
      res.redirect("/product");
    })

    // Catch any remaning errors
    .catch(() => {
      res.render("login", { isLoggedIn: false, error: "Error finding user" });
    });
});

// @desc Adds single user into the database, returns cookie session
// @route /api/auth/
// @method POST

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  // If no username was provided
  if (!username) {
    res.render("signup", {
      isLoggedIn: false,
      error: "Please enter your username",
    });
  }

  // If no email was provided
  if (!email) {
    res.render("signup", {
      isLoggedIn: false,
      error: "Please enter your email",
    });
  }

  // If no password was provided
  if (!password) {
    res.render("signup", {
      isLoggedIn: false,
      error: "Please enter your password",
    });
  }

  getUserByEmail(email)
    .then((user) => {
      // If no user is returned
      if (user) {
        res.render("signup", { isLoggedIn: false, error: "User already exists" });
      }

      // Encrypt password before pushing out
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      // Attempt to add user to database
      addUser(username, email, hash)
        .then((user) => {
          req.session.user_id = user.id;
          res.redirect("/product");
        })

        // Catch any remaining errors
        .catch(() => {
          res.render("signup", {
            isLoggedIn: false,
            error: "Error adding user",
          });
        });
    })

    // Catch any remaning errors
    .catch(() => {
      res.render("signup", { isLoggedIn: false, error: "Error finding user" });
    });
});

// @desc Logout user by clearing cookie session
// @route /api/auth/
// @method POST

router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

// @route /auth/admin
// @desc Check if user is admin
// @method GET

router.get("/admin", (req, res) => {
  const userId = req.session.user_id;

  // If user is not logged in, just return false
  if (!userId){
    res.send({ isAdmin: false });
  }

  // Check user information
  getUserById(userId).then((user) => {
    res.send({ isAdmin: user.is_admin });
  }).catch(()=>{
    res.send({ isAdmin: false });
  })
});

module.exports = router;
