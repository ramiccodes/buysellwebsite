const db = require("../connection");

// @desc Queries arrays of product objects
const getProducts = (options) => {
  // Hard page limit per load
  const PAGE_LIMIT = 20;
  const { page, min, max, category, title } = options;

  // Variables relating to querying by option provided
  let variableIndex = 1;
  let isFirstQuery = true;
  let params = [];
  let queryString = "SELECT * FROM products ";

  // Filter by Price
  if (title) {
    params.push(`%${title}%`);
    queryString += `${
      isFirstQuery ? "WHERE" : "AND"
    } title LIKE $${variableIndex}`;
    variableIndex++;
    isFirstQuery = false;
  }

  // Filter by Price
  if (min && max) {
    params.push(min);
    params.push(max);
    queryString += `${
      isFirstQuery ? "WHERE" : "AND"
    } price >= $${variableIndex} AND price <= $${variableIndex + 1} `;
    variableIndex += 2;
    isFirstQuery = false;
  }

  // Filter by Category
  if (category) {
    console.log("Category", category);
    params.push(category);
    queryString += `${
      isFirstQuery ? "WHERE" : "AND"
    } category = $${variableIndex} `;
    variableIndex++;
    isFirstQuery = false;
  }

  // Limit per page
  if (page >= 0 || page) {
    params.push(page * 20);
    queryString += `LIMIT ${PAGE_LIMIT} OFFSET $${variableIndex}; `;
    variableIndex++;
    isFirstQuery = false;
  }

  return db.query(queryString, params).then((data) => {
    console.log("run")
    return data.rows;
  });
};

// @desc Queries one product object by Id
const getProductById = (id) => {
  return db
    .query("SELECT * FROM products WHERE products.id = $1", [id])
    .then((data) => {
      return data.rows[0];
    });
};

// @desc Queries one product, with associated user by product id
const getProductWithUserById = (id) => {
  return db
    .query(
      "SELECT products.id as product_id, * FROM products JOIN users ON (users.id=products.user_id) WHERE products.id = $1",
      [id]
    )
    .then((data) => {
      return data.rows[0];
    });
};

// @desc Queries to add one product to database
const addProduct = (product) => {
  return db
    .query(
      `
  INSERT INTO products (user_id, title, price, img, description, category, is_sold)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `,
      [
        product.user_id,
        product.title,
        product.price,
        product.img,
        product.description,
        product.category,
        product.is_sold,
      ]
    )
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      return err;
    });
};

// @desc Queries to delete one product on the database by ID
const deleteProduct = (id) => {
  return db
    .query("DELETE FROM products WHERE products.id = $1", [id])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

const editProduct = (id, details) => {
  return db.query(
    `
    UPDATE products SET title = $1, price = $2, img = $3, description = $4, category = $5, is_sold = $6 WHERE id = $7;
    `,
    [
      details.title,
      details.price,
      details.img,
      details.description,
      details.category,
      details.is_sold,
      id,
    ]
  );
};

// @desc Queries to mark one product as sold on the database by ID
const markAsSold = (id, isSold) => {
  return db.query(`UPDATE products SET is_sold = $1 WHERE id = $2`, [
    isSold,
    id,
  ]);
};

// @desc Queries to favorite one product on the database by the user ID and item ID
const addFavorite = (userId, itemId) => {
  return db.query(
    `INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) RETURNING *;`,
    [userId, itemId]
  );
};

const removeFavorite = (userId, itemId) => {
  return db.query(
    `DELETE FROM favorites WHERE user_id = $1 AND product_id = $2;`,
    [userId, itemId]
  );
};

const filterByPrice = (min, max) => {
  return db.query(`SELECT * FROM products WHERE price <= $2 AND price >= $1;`, [
    min,
    max,
  ]);
};

module.exports = {
  getProducts,
  getProductWithUserById,
  getProductById,
  addProduct,
  deleteProduct,
  editProduct,
  markAsSold,
  addFavorite,
  removeFavorite,
  filterByPrice,
};
