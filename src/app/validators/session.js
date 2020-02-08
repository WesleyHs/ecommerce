const User = require('../models/User')
const { compare } = require('bcryptjs')


async function login(req, res, next) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) return res.render("session/login", {
        error: "Usuário não encontrado!"
    })

    const passed = await compare(password, user.password)

    if (!passed) return res.render("session/login", {
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user

    next()
}

async function forgot(req, res, next) {
    const { email } = req.body

    try {
        let user = await User.findOne({ where: { email } })

        if (!user) return res.render("session/forgot-password", {
            error: "email não encontrado!"
        })

        req.user = user

        next()

    } catch (err) {
        console.error(err)
    }


}

async function reset(req, res, next) {
    //procurar usuario
    const { email, password, token, passwordRepeat } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Usuário não encontrado!"
    })

    //ver se a senha bate
    if (password != passwordRepeat) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Confirmação de senha incorreta'
    })

    //verificar se o token bate
    if (token != user.reset_token) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Token inválido! Solicite uma nova solicitaçaõ de senha'
    })

    //verificar se o token não expirou

    let now = new Date()
    now = now.setHours(now.getHours())

    if(now > user.reset_token_expires) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Token expirado! por favor solicite uma nova recuperação de senha'
    })

    req.user = user

    next()

}

module.exports = {
    login,
    forgot,
    reset
}



