const assert = require("assert");
const Product = require("./productsschema");

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
    }
}

