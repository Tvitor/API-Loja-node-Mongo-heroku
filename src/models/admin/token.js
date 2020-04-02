const jwt = require("jsonwebtoken");
const key = require("../../../config/auth.json");
const Admin = require("./adminschema");

module.exports = {

    //Create Token
    tokenGenerator(params) {
        return jwt.sign(params, key.secret, {expiresIn: 86400});
    },
    
    //decode Token
    tokendDecoded(req, res){
        const authHeader = req.headers.authorization;
        const parts = authHeader.split(' ');
        const [scheme, token] = parts;
        let regex = /^Bearer$/i.test(scheme);
        return token;
    } ,
    
    //Change token
    updateToken(data){
        Admin.updateOne(
            { _id: data.admin.id },
            { $set: { token: data.token}},{upsert:true}).then((result, err) => {
               return 
           })
    }
}
