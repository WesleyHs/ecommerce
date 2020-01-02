const express = require ('express')
const routes =  express.Router()
const ProdocutController = require('./app/controllers/ProductController')


routes.get('/', function(req, res){ //pagina inicial 
    return res.render("layout.njk") //redirecionar
})

routes.get('/products/create', ProdocutController.create)
routes.post('/products', ProdocutController.post)


routes.get('/ads/create', function(req, res){
    return res.redirect("/products/create")
})

module.exports = routes