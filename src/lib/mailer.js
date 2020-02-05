const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "598485d39ae41a",
      pass: "4a6ab6af1b3b12"
    }
  })

