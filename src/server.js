const express = require('express') //chama a dependencia express, pra dentro da variavel
const nunjucks = require('nunjucks')
const routes = require("./routes") //chamar as rotas
const methodOverride = require('method-override')

const server = express() //o servidor vai executar o express

server.use(express.urlencoded({ extended: true})) //faz funcionat o req.body
server.use(express.static('public')) //pegar o que tem exemplo css da pasta public
server.use(methodOverride('_method')) //sobre escrever o methor POST p/ PUT
server.use(routes) //vai 

server.set("view engine", "njk") //configuração


nunjucks.configure("src/app/views", {
    express:server,
    autoescape: false,
    noCache: true //faz copia da sua maquina
}) //caminho é ir pra views

//iniciar a rota



//iniciar o servidor
server.listen(5000, function() {
    console.log("Server is runnig") //bandera se estiver rodando 
})