const db = require("../connection");

// @desc Queries  all users
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

// @desc Queries single by user id
const getUserById = (id) => {
  return db.query(`SELECT * FROM users WHERE id = $1;`, [id]).then((data) => {
    return data.rows[0];
  });
};

// @desc Queries single by user email
const getUserByEmail = (email) => {
  return db
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((data) => {
      return data.rows[0];
    });
};

// @desc Queries to add one user to database
const addUser = (username, email, password) => {
  return db
    .query(
      "INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4)",
      [username, email, password, false]
    )
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      return err;
    });
};

module.exports = { getUsers, getUserByEmail, addUser, getUserById };
