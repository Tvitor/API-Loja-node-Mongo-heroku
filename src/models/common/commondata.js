
const Product = require("../products/productsschema");

module.exports = {
    async listProducts(page, limit) {
        page = parseInt(page);
        limit = parseInt(limit);

        return Product.find({}).skip(page).limit(limit);
    }
}