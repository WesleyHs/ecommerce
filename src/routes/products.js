const express = require('express')
const routes =  express.Router()
const multer = require('../app/middlewares/multer') //multer

const ProductController = require('../app/controllers/ProductController')
const SearchController = require('../app/controllers/SearchController')

const { onlyUsers } = require('../app/middlewares/session')


routes.get('/search', SearchController.index)

//rotas pra adicionar produto
routes.get('/create', ProductController.create)
routes.get('/create', onlyUsers, ProductController.create)
routes.get('/:id', ProductController.show)
routes.get('/:id/edit', ProductController.edit)
routes.get('/:id/edit', onlyUsers, ProductController.edit)

routes.post('/', multer.array("photos", 6), ProductController.post)
routes.put('/', multer.array("photos", 6), ProductController.put)
routes.delete('/', ProductController.delete)
routes.post('/', onlyUsers, multer.array("photos", 6), ProductController.post)
routes.put('/', onlyUsers, multer.array("photos", 6), ProductController.put)
routes.delete('/', onlyUsers, ProductController.delete)

module.exports = routes