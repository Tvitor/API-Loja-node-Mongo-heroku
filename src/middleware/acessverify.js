const jwt = require("jsonwebtoken");
const key = require("../../config/auth.json");
const admin = require("../models/admin/admindata");
const moment = require("moment");
const now = new Date();

module.exports =  (req, res, next) => {
    const authHeader = req.headers.authorization;
        if(!authHeader)
        return res.status(401).send({error: 'Não autorizado'});
    
    const parts = authHeader.split(' ');
    if(!(parts.length === 2))
    return res.status(401).send({error: 'Não autorizado'});

    const [scheme, token] = parts;
    let regex = /^Bearer$/i.test(scheme);
    if(!regex)
    return res.status(401).send({error: 'Não autorizado'});

    jwt.verify(token, key.secret, async (err, decoded) => {
        if(err) return res.status(401).send({error: 'Não autorizado'});
        
        admin.findAdminById(decoded.id).then(function(resultAdmin){
            if(!resultAdmin)
                return res.status(401).send({error: 'Não autorizado'});
    
            const past = moment(resultAdmin.ultimLogin, 'YYYY-MM-DD HH:mm:ss');
            const newNow =  moment(now, 'YYYY-MM-DD HH:mm:ss'); 
    
            let duration = moment.duration(past.diff(newNow));
            let resultDuration = parseInt(duration._data.minutes) * -1;
            
            if(resultDuration > 240)
                return res.status(401).send({error: 'Sessão inválida'});
    
            });
            
            req.userId = decoded.id;
            
            return next();
    })

}