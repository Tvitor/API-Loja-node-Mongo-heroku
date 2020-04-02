const moment = require("moment");
const productData = require("./productsdata");
const now = new Date();


module.exports = {
    // create or insert item

    async insertProduct(req, res) {
        const userId = req.userId;
        let newProduct = [];

        req.body.map((element, index)=>{
            let {sku, nome, preco, categoria} = element;
            preco = preco.replace(/,/g, ".");
    
            if(sku && nome && preco && categoria){
            
                newProduct[index] = {
                    ...{"sku":sku},
                    ...{"nome":nome},
                    ...{"preco":preco},
                    ...{"categoria":categoria},
                    ...{"dataCriacao":now},
                    ...{"dataAtualizacao":now},
                    ...{"idResponsavel":userId}
                };
            }else return res.status(400).send({error:"Falha ao registrar"});
    
        });

        try { 
            
            await productData.productCreate(newProduct) 
            
            res.status(200).send(data);
            
        }catch(error){
            return res.status(400).send({error:"SKU já existe"})
        }

    },

}