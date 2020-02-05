const crypto = require('crypto')


module.exports = {

    loginForm(req, res){
        return res.render("session/login")
    },
    login(req, res){
        req.session.userId = req.user.id 
        return res.redirect("/users")
    },
    
    logout(req, res){
        req.session.destroy()
        return res.redirect("/")
    },
    forgotForm(req, res){
        return res.render("session/forgot-password")
    },
    async forgot(req, res){

        const user = req.user
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

        //avisar o usuario que enviamos o email 
    }

}