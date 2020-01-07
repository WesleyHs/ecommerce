const express = require('express')
const routes =  express.Router()
const multer = require('./app/middlewars/multer') //multer
const ProductController = require('./app/controllers/ProductController')


routes.get('/', function(req, res){ //pagina inicial 
    return res.render("layout.njk") //redirecionar
})

//rotas pra adicionar produto
routes.get('/products/create', ProductController.create)
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