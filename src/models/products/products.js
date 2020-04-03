const moment = require("moment");
const productData = require("./productsdata");
const productSchema = require("./productsschema");
const now = new Date();


module.exports = {
    // create or insert item

    async insertProduct(req, res) {
        const userId = req.userId;
        let newProduct = [];

        req.body.map((element, index)=>{
            let {nome, preco, categoria} = element;
            preco = preco.replace(/,/g, ".");
           
            if( nome && preco && categoria){
            
                newProduct[index] = {
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
            
          let data =  await productData.productCreate(newProduct) 
            
            res.status(200).send(data);
            
        }catch(error){
            return res.status(400).send({error:"produto já cadastrado"})
        }

    },

    //Product Update
    async updateProduct(req, res) {
        let userId = req.userId;
        let product = req.body;
        let editedProduct = [];
        let data

        product.map((element, index)=>{
            editedProduct[index] = {
                ...element,
                ...{"dataCriacao":now},
                ...{"dataAtualizacao":now},
                ...{"idResponsavel":userId}
            };
        })

        data = await productData.productUpdate(editedProduct) 
           
        res.status(200).send(data);
    }

}