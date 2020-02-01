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
        },
        formatCpfCnpj(value) {
            value = value.replace(/\D/g, "")
    
            if (value.length > 14) value = value.slice(0, -1)
    
            //check if is cpf or cnpj
            //mascara CNPJ
            if (value.length > 11) {
                value = value.replace(/(\d{2})(\d)/, "$1.$2")
                value = value.replace(/(\d{3})(\d)/, "$1.$2")
                value = value.replace(/(\d{3})(\d)/, "$1/$2")
                value = value.replace(/(\d{3})(\d)/, "$1-$2")
    
            } else {
    
            }
            // mascara cpf
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1-$2")
    
            return value
        },
        formatCep(value) {
            value = value.replace(/\D/g, "")
    
            if (value.length > 8) value = value.slice(0, -1)
    
    
            value = value.replace(/(\d{5})(\d)/, "$1-$2")
    
            return value
        }
    }
 
