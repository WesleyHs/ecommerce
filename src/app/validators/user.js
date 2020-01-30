const User = require('../models/User')

 async function post(req, res, next) {

            //se todos campos estao corretos
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.render('user/register', {
                user: req.body,
                error: 'Por favor preencha todos os campos'
            })
        }
    }

    //se o usuario já existe

    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({
        where: { email },
        or: { cpf_cnpj }
    })

    if (user) return res.render('user/register', {
        user: req.body,
        error: 'Usuario existente'
    })


    if (password != passwordRepeat) return res.render('user/register', {
        user: req.body,
        error: 'Confirmação de senha incorreta'
    })

    next()


}

module.exports = {
    post
}