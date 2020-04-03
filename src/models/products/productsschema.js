const mongoose = require("../../../config/mongo");
let Schema = mongoose.Schema;

let Productchema = new Schema({

    nome: {
        type: String,
        require:true,
        uppercase:true
    },
    preco: {
        type: Number,
        required:true
    },
    categoria:{
        type:String,
        required:true,
        uppercase:true
    },
    dataCriacao: {
        type: Date,
        required:true
    },
    idResponsavel:{
        type:String,
        required:true
    },
    dataAtualizacao:{
        type:Date,
        required:true
    }
});

Productchema.method('transform', function() {
    let obj = this.toObject();
 
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
 
    return obj;
});

const Product = mongoose.model('Product', Productchema);
module.exports = Product;