const moment = require("moment");
const tokenMethods = require("./token");
const bcrypt = require('bcryptjs');
const now = new Date();
const adminData = require("./admindata");

module.exports = {
    //User Register
    async adminRegister(req, res) {
        const{email} = req.body;
        
            if(email){
                if(await adminData.findAdmin({email}))
                    return res.status(400).send({error: "E-mail já existente"});
            }else{
                return res.status(400).send({error: "Parametro não informado"});
            }

            try { 
                let newAdmin = {...req.body, ...{"dataCriacao": now}, ...{ "ultimoLogin":now}, ...{"dataAtualizacao":now}};
                
                let admin = await adminData.createAdmin(newAdmin);
                
                admin.senha = undefined;
                
                let data = await this.adminJson(admin);

                tokenMethods.updateToken(data);

                res.status(201).send(data);
            
        }catch(error){
            return res.status(400).send({error:"Falha ao registrar"})
        }

    },

    //User login 
    async adminLogin(req, res) {
        const {email, senha} = req.body;
        const password = true;
    
        if(!email || !senha)
            return res.status(400).send({error: 'parametros não informados'}); 

        let admin = await adminData.findAdmin({email}, password);

        if(!admin)
            return res.status(400).send({error: 'Usuário e/ou senha inválidos'});

        if(!await bcrypt.compare(senha, admin.senha))
            return res.status(401).send({error: 'Usuário e/ou senha inválidos'});

            adminData.updatelastLogin(admin, now);
            
        let data = await this.adminJson(admin, now);

        tokenMethods.updateToken(data);

        res.status(200).send(data);

    },
    //Admin Json 
    adminJson (dataAdmin, now) {
        let admin;
        let login = now ? now : dataAdmin.ultimoLogin;

            admin = {
                "id":dataAdmin._id, 
                "usuario":dataAdmin.nome, 
                "dataCriacao": dataAdmin.dataCriacao, 
                "ultimoLogin": login, 
                "dataAtualizacao": dataAdmin.dataAtualizacao
            };

            return {admin, "token": tokenMethods.tokenGenerator({id:admin.id})}

    } 
}