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

        results = await Category.all()
        const categories = results.rows

        return res.render("products/create.njk", { productId, categories })
        


    }
}