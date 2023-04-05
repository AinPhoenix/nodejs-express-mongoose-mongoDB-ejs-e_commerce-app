const express = require("express");

const isAuth = require("./../middlewares/is-auth");
const adminController = require("../controllers/admin");

const { body } = require("express-validator");

const router = express.Router();

// GET ROUTES
router.get("/add-product", isAuth, adminController.getAddProduct);
router.get("/products", adminController.getProducts);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

// POST ROUTES
router.post(
  "/edit-product",
  [body("title").isAlphanumeric().isLength({ min: 3 }).trim(), body("price").isFloat().trim(), body("description").isLength({ min: 5 }).trim()],
  isAuth,
  adminController.postEditProduct
);
router.post(
  "/add-product",
  [body("title").isAlphanumeric().isLength({ min: 3 }).trim(), body("price").isFloat().trim(), body("description").isLength({ min: 5 }).trim()],
  isAuth,
  adminController.postAddProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
