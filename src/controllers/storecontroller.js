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

module.exports = app => app.use('/store', router);
