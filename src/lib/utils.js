const Intl = require('intl') 

module.exports = {
        date(timestamp){
            const date = new Date(timestamp)

            //yyy  //UTC tempo universal
            const year = date.getFullYear()
            //month
            const month = `0${date.getMonth() + 1}` .slice(-2)
            //day
            const day = `0${date.getDate()}` .slice(-2)
            //hours
            const hour = date.getHours()
            const minutes  = date.getMinutes()

            return {
                day,
                month,
                year,
                hour,
                minutes,
                iso: `${year}-${month}-${day}`,
                birthDay:`${day}/${month}`,
                format:`${day}/${month}/${year}`,
            }
        },

        //formatação do preço
        formatPrice(price) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(price/100)
        }
    }
 
