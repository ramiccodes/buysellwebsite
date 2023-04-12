const db = require("../connection");

// @desc Queries arrays of product objects
const getProducts = () => {
  return db.query("SELECT * FROM products;").then((data) => {
    return data.rows;
  });
};

// @desc Queries arrays of product objects
const getProductsByPage = (page) => {

  // Magic Number 20: Limit of products shown each page
  return db
    .query("SELECT * FROM products LIMIT 20 OFFSET $1;", [page * 20])
    .then((data) => {
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
      "SELECT * FROM products JOIN users ON (users.id=products.user_id) WHERE products.id = $1",
      [id]
    )
    .then((data) => {
      console.log(data)
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
      console.log(err.message);
      return null;
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
}


const editProduct = (id) => {
  const { title, price, img, description, category, is_sold } = req.body;
  return db
    .query(`
    UPDATE products SET title = $1, price = $2, img = $3, description = $4, category = $5, is_sold = $6 WHERE id = $7;
    `,
        [
          title,
          price,
          img,
          description,
          category,
          is_sold,
          id
        ]
      )
};

// @desc Queries to mark one product as sold on the database by ID
const markAsSold = (id) => {
  return db.query(`UPDATE products SET is_sold = true WHERE id = $1;`, [id])
}

// @desc Queries to favorite one product on the database by the user ID and item ID
const addFavorite = (userId, itemId) => {
  return db.query(`INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) RETURNING *;`, [userId, itemId]);
}

const removeFavorite = (userId, itemId) => {
  return db.query(`DELETE FROM favorites WHERE user_id = $1 AND product_id = $2;`, [userId, itemId]);
}

const filterByPrice = (min, max) => {
  return db.query(`SELECT * FROM products WHERE price <= $2 AND price >= $1;`, [min, max]);
}

module.exports = {
  getProducts,
  getProductsByPage,
  getProductWithUserById,
  getProductById,
  addProduct,
  deleteProduct,
  editProduct,
  markAsSold,
  addFavorite,
  removeFavorite,
  filterByPrice
};
