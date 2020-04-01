const moment = require("moment");
const tokenMethods = require("./token");
const bcrypt = require('bcryptjs');
const now = new Date();
const adminMethods = require("./adminmethods");

module.exports = {
    //User Register
    async adminRegister(req, res) {
        const{email} = req.body;
        
            if(email){
                if(await adminMethods.findAdmin({email}))
                    return res.status(400).send({error: "E-mail já existente"});
            }else{
                return res.status(400).send({error: "E-mail não recebido"});
            }

            try { 
                let newAdmin = {...req.body, ...{"data_criacao": now}, ...{ "ultimo_login":now}, ...{"data_atualizacao":now}};
                
                let admin = await adminMethods.createAdmin(newAdmin);
                
                admin.senha = undefined;
                
                adminMethods.updatelastLogin(admin, now);
                
                let data = await this.adminJson(admin, now, null);

                tokenMethods.updateToken(data);

                res.status(200).send(data);
            
        }catch(error){
            return res.status(400).send({error:"Falha ao registrar"})
        }

    },

    //Admin Json 
    adminJson (dataAdmin, now, search) {
        let user;
        if(!search){

            admin = {
                "id":dataAdmin._id, 
                "usuario":dataAdmin.nome, 
                "dataCriacao": dataAdmin.data_criacao, 
                "ultimoLogin": now, 
                "dataAtualizacao": dataAdmin.data_atualizacao
            };

            return {admin, "token": tokenMethods.tokenGenerator({id:admin.id})}

        }else{
            admin = {
                "id":dataAdmin._id, 
                "usuario":dataAdmin.nome, 
                "dataCriacao": dataAdmin.data_criacao, 
                "ultimoLogin": dataAdmin.ultimo_login, 
                "dataAtualizacao": dataAdmin.data_atualizacao
            };
            return {admin, "token":dataAdmin.token};
        }
    } 
}