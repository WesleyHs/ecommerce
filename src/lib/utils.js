const Intl = require('intl') 

module.exports = {
        date(timestamp){
            const date = new Date(timestamp)

            //yyy  //UTC tempo universal
            const year = date.getUTCFullYear()
            //month
            const month = `0${date.getUTCMonth() + 1}` .slice(-2)
            //day
            const day = `0${date.getUTCDate()}` .slice(-2)

            return {
                day,
                month,
                year,
                iso: `${year}-${month}-${day}`,
                birthDay:`${day}/${month}`,
                format:`${day}/${month}/${year}`,
            }
        }
    }
 
