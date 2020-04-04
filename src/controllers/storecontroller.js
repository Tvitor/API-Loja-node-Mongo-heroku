const express = require("express");
const authMiddleWare = require("../middleware/acessverify");
const products = require("../models/products/products");
const router = express.Router();

router.use(authMiddleWare);

router.post("/insert/product", (req, res) => {
    products.insertProduct(req, res);
    
});
router.post("/update/product", (req, res) => {
    products.updateProduct(req, res);
    
});
router.post("/delete/product", (req, res) => {
    products.deleteProduct(req, res);
});
router.get("/list/product", (req, res) => {
    products.listProduct(req, res);

});
router.get("/find/product", (req, res) => {
    products.findProduct(req, res);

});

module.exports = app => app.use('/store', router);
