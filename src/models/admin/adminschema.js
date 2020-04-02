const mongoose = require("../../../config/mongo");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    nome: {
        type: String,
        require:true
    },

    email: {
        type: String,
        unique: true,
        required:true,
        lowercase: true,
    },
    senha: {
        type: String,
        required:true,
        select: false
    },
    dataCriacao: {
        type: Date
        
    },
    ultimoLogin:{
        type: Date
    },
    dataAtualizacao:{
        type:Date
    },
    token: {
        type:String
    }
})

AdminSchema.pre('save', async function(next) {
const hash = await bcrypt.hash(this.senha, 10);
this.senha = hash;

next();
})

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;