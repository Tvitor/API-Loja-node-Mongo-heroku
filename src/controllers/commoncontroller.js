const express = require("express");
const products = require("../models/common/common");
const router = express.Router();

router.get("/list/product", (req, res) => {
    products.listProduct(req, res);

});

module.exports = app => app.use('/common', router);