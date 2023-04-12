const db = require("../connection");

// @desc Queries  all users
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

// @desc Queries single by user id
const getUserById = (id) => {
  return db.query(`SELECT * FROM users WHERE id = $1`, [id]).then((data) => {
    return data.rows[0];
  });
};

module.exports = { getUsers, getUserById };
