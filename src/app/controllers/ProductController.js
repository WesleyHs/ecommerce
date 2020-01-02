const Category = require('../models/Category')

const Product = require('../models/Product')


module.exports = { //exportar o modulo//
    create(req, res) {
        //pegar Categorias
        Category.all()//promessa
            .then(function (results) {
                const categories = results.rows
                return res.render("products/create.njk", { categories })

            })//senao//
            .catch(function (err) {
                throw new Error(err)
            })
    },
    async post(req, res) {
        //Logica de Salvar
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos')
            }
        }


        let results = await Product.create(req.body)//esperar a promise dar certo pra continuar o codigo
        const productId = results.rows[0].id //rows é o array

        return res.redirect(`products/${productId}`)
        


    },

    async edit(req, res){


        let results = await Product.find(req.params.id)//esperar a promise dar certo pra continuar o codigo
        const product = results.rows[0] //rows é o array

        if (!product) return res.send("Product not found")

        
        results = await Category.all()
        const categories = results.rows

        return res.render("products/edit.njk", { product, categories })

    },

    async put(req, res){
        //se tudo esta preenchido
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos')
            }
        }

        //manter o valor antigo

        if (req.body.old_price != req.body.price){
            const oldProduct = await product.find(req.body.id)
            req.body.old.price = oldProduct.rows[0].price
        }

        await Product.update(req.body)

        return res.redirect(`/products/${req.body.id}/edit`)
    },

    async delete(req, res){
        await Product.delete(req.body.id)

        return res.redirect('/products/create')

    }
}