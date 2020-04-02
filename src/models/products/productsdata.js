const assert = require("assert");
const Product = require("./productsschema");

module.exports = {
    productCreate(newProduct){
        newProduct.map( (element) => {Product.create(element)})
           
        return ;
         
    }
}

