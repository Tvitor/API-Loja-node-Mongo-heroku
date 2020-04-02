const mongoose = require("../../../config/mongo");
const Schema = mongoose.Schema;

const Productchema = new Schema({

    nome: {
        type: String,
        require:true,
        uppercase:true
    },

    sku: {
        type: String,
        unique: true,
        required:true
    },
    preco: {
        type: Number,
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    dataCriacao: {
        type: Date
    },
    idResponsavel:{
        type:String,
        required:true
    },
    dataAtualizacao:{
        type:Date,
        required:true
    }
})

const Product = mongoose.model('Product', Productchema);
module.exports = Product;