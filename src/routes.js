const express = require('express')
const routes =  express.Router()
const multer = require('./app/middlewars/multer') //multer
const ProductController = require('./app/controllers/ProductController')
const HomeController = require('./app/controllers/HomeController')
const SearchController = require('./app/controllers/SearchController')





routes.get('/', HomeController.index)

routes.get('/products/search', SearchController.index)


// routes.get('/', function(req, res){ //pagina inicial 
//     return res.render("home/index.njk") //redirecionar
// })

//rotas pra adicionar produto
routes.get('/products/create', ProductController.create)
//show
routes.get('/products/:id', ProductController.show)
//rota para editar
routes.get('/products/:id/edit', ProductController.edit)
//rota para atualizar
routes.post('/products', multer.array("photos", 6), ProductController.post) //limit 6fts
routes.put('/products', multer.array("photos", 6), ProductController.put)
//rota para excluir
routes.delete('/products', ProductController.delete)



routes.get('/ads/create', function(req, res){
    return res.redirect("/products/create")
})

module.exports = routes