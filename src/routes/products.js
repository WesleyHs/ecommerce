const express = require('express')
const routes =  express.Router()
const multer = require('../app/middlewars/multer') //multer

const ProductController = require('../app/controllers/ProductController')
const SearchController = require('../app/controllers/SearchController')



routes.get('/search', SearchController.index)

//rotas pra adicionar produto
routes.get('/create', ProductController.create)
//show
routes.get('/:id', ProductController.show)
//rota para editar
routes.get('/:id/edit', ProductController.edit)
//rota para atualizar
routes.post('/', multer.array("photos", 6), ProductController.post) //limit 6fts
routes.put('/', multer.array("photos", 6), ProductController.put)
//rota para excluir
routes.delete('/', ProductController.delete)


module.exports = routes