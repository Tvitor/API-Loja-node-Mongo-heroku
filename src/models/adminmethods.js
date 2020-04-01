const assert = require("assert");
const Admin = require("./adminschema");

module.exports = {
    //find Admin
    async findAdmin(email, password, id){
        if(!password){
            const result = await Admin.findOne(email).exec();
            return result;
        }else{
            const result = await Admin.findOne(email).select('+senha');
            return result;
        }
    },

    async createAdmin(newAdmin) {
        const admin = await Admin.create(newAdmin);
        return admin;
    },

    //update login
    updatelastLogin(data, now) {
        Admin.findOneAndUpdate({ultimo_login:data.ultimo_login},{ultimo_login:now}).then( () =>{
                 Admin.findOne({_id:data._id}).then((result) => {
                     assert(result.ultimo_login , now);
                     return;
                 })
                 
         });
    }
}