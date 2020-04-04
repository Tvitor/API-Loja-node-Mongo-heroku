const moment = require("moment");
const productData = require("./productsdata");
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
        let data;

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
    },
    
    async deleteProduct(req, res) {
        let productId = req.body;
        let data;

        data = await productData.productDelete(productId, res);
        //res.status(200).send([data, "exclusão concluída"]);
    },

    async listProduct(req, res) {
        let page = req.query.page;
        let limit = req.query.limit;
        let data;
        
        data = await productData.listProducts(page, limit);
        res.status(200).send(data);
    },

    async findProduct(req, res) {
        productId = req.body;
        let data;
        
        data = await productData.findProducts(productId);
        res.status(200).send(data);
    }

}