const express = require("express");
const authMiddleWare = require("../middleware/acessverify");
const userMethods = require("../models/products.js");
const router = express.Router();

router.use(authMiddleWare);

//adicionar e etc

module.exports = app => app.use('/store', router);
