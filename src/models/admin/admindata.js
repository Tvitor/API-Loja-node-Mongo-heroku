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
    //Find Admin by id
    findAdminById(id){
        
        return Admin.findOne({_id:id});
    
},

    

    async createAdmin(newAdmin) {
        const admin = await Admin.create(newAdmin);
        return admin;
    },

    //update login
    updatelastLogin(data, now) {
        Admin.findOneAndUpdate({ultimoLogin:data.ultimoLogin},{ultimoLogin:now}).then( () =>{
                 Admin.findOne({_id:data._id}).then((result) => {
                     assert(result.ultimoLogin , now);
                     return;
                 })
                 
         });
    }
}