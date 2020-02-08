const User = require('../models/User')

const crypto = require('crypto')
const mailer = require('../../lib/mailer')

module.exports = {

    loginForm(req, res) {
        return res.render("session/login")
    },
    login(req, res) {
        req.session.userId = req.user.id
        return res.redirect("/users")
    },

    logout(req, res) {
        req.session.destroy()
        return res.redirect("/")
    },
    forgotForm(req, res) {
        return res.render("session/forgot-password")
    },
    async forgot(req, res) {

        const user = req.user

        try {

            // um token para esse usuario
            const token = crypto.randomBytes(20).toString("hex")

            // criar expiração
            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            //enviar email de recuperação de senha
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@launchstore.com.br',
                subject: 'Recuperação de senha',
                html: `
            
            <h2>Perdeu a chave?</h2>
            <p>Não se preocupe, clique aqui no link abaixo pra recuperar a sua senha</p>
            <p>
                <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                    Recuperar senha
                </a>

            </p>
            `,

            })
            //avisar o usuario que enviamos o email 
            return res.render("session/forgot-password", {
                success: "Verfique seu email para resetar a sua senha"
            })

        } catch (err) {
            console.error(err)
                ("session/forgot-password", {
                    success: "Erro inesperado"
                })
        }

    },

    resetForm(req, res) {
        return res.render("session/password-reset", { token: req.query.token })
    },
    reset(req, res) {
        const { email, password, passwordRepeat, token } = req.body

        try {
            //cria um novo hash de senha

            //atualiza o usuario

            //avisa o usuario que ele tem uma nova senha

        } catch (err) {
            console.error(err)
                ("session/password-reset", {
                    success: "Erro inesperado"
                })

        }
    }

}