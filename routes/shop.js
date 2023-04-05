const express = require("express");

const isAuth = require("./../middlewares/is-auth");
const shopController = require("../controllers/shop");

const router = express.Router();

// GET ROUTES
router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", isAuth, shopController.getCart);
router.get("/orders", isAuth, shopController.getOrders);
router.get("/orders/:orderId", isAuth, shopController.getInvoice);
router.get("/checkout", isAuth, shopController.getCheckout);

// POST ROUTES
router.post("/cart", isAuth, shopController.postCart);
router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);
router.post("/create-order", isAuth, shopController.postOrder);

module.exports = router;
