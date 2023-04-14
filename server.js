// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "user_id",
    keys: [process.env.COOKIE_KEYS || "password"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const authApiRoutes = require("./routes/auth-api");
const s3ApiRoutes = require("./routes/s3-api");
const productsApiRoutes = require("./routes/products-api");
const usersApiRoutes = require("./routes/users-api");
const productRoutes = require("./routes/product");
const onboardingRoutes = require("./routes/onboarding");
const favoritesRoutes = require("./routes/favorites");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/products", productsApiRoutes);
app.use("/api/users", usersApiRoutes);
app.use("/api/auth", authApiRoutes);
app.use("/api/s3", s3ApiRoutes);
app.use("/product", productRoutes);
app.use("/", productRoutes);
app.use("/auth", onboardingRoutes);
app.use("/favorites", favoritesRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get("/", (req, res) => {
//   res.redirect("/product");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
