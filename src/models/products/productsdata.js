const assert = require("assert");
const Product = require("./productsschema");
const mongoose = require ("mongoose");
module.exports = {
  async  productCreate(newProduct){
        let result = [];
        result = await Product.create(newProduct)
    
        return result;

    },

    async productUpdate(product){
        let key;
        let value;
        let keyColumn;
        let valueColumn;
        let item = {};

        product.map((element)=>{
            for(let i = 0; i < Object.keys(element).length; i++){
                key = Object.values(Object.keys(element));
                value = Object.values(Object.values(element));
                keyColumn = key[i];
                valueColumn = value[i];
                item[keyColumn]= valueColumn;
            
                Product.findOneAndUpdate({_id: element._id }, { "$set": item}, {new: true}, function(err, end){
                    item = {};
                });
            }
        })

        return  "Alteração concluída";  
    },

    async productDelete(productId, res) {
        let values = Object.values(productId);

        Product.deleteMany(function(err, result){
            if(err) {
                return  res.status(404).send([err, "produtos não encontrados"]);
            }else{
                return res.status(404).send({"itens_removidos":result.deletedCount});
            }
        }).where('_id').in(values);

    },
    
    async listProducts(page, limit) {
        page = parseInt(page);
        limit = parseInt(limit);

        return Product.find({}).skip(page).limit(limit);
    },

    async findProducts(findProducts) {
        let list = Object.values(findProducts);
        return Product.find().where('_id').in(list);
    }
}

