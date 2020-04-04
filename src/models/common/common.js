
const commonData = require("./commondata");

module.exports = {
    
    async listProduct(req, res) {
        let page = req.query.page;
        let limit = req.query.limit;
        let data;
        
        data = await commonData.listProducts(page, limit);
        res.status(200).send(data);
    }
}