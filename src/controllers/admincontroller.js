const express = require("express");
const router = express.Router();
const admin = require("../models/admin/admin");

router.post('/register',  (req, res)=> {
    admin.adminRegister(req, res)
    
});
router.get('/login',  (req, res)=> {
    admin.adminLogin(req, res)

});

module.exports = app => app.use('/admin', router);