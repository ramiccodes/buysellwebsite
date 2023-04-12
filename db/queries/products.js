const db = require('../connection');

// @desc Queries arrays of product objects
const getProducts = () => {
  return db.query('SELECT * FROM products;')
    .then(data => {
      return data.rows;
    });
};

// @desc Queries one product object by Id
const getProductById = (id) => {
  return db.query('SELECT * FROM products WHERE products.id = $1', [id])
    .then(data => {
      return data.rows[0];
    });
}

// @desc Queries one product, with associated user by product id
const getProductWithUserById = (id) => {
  return db.query('SELECT * FROM products JOIN users ON (users.id=products.user_id) WHERE products.id = $1', [id])
    .then(data => {
      return data.rows[0];
    });
}

// @desc Queries to add one product to database
const addProduct = (product) => {
  return db.query(`
  INSERT INTO products (user_id, title, price, img, description, category, is_sold)
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `, [product.user_id, product.title, product.price, product.img, product.description, product.category, product.is_sold])
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
}

module.exports = { getProducts, getProductWithUserById, getProductById, addProduct };
