const db = require('../../config/db')

const fs = require('fs')

//salvando as imagens
module.exports = {
    create({filename, path, product_id}) {
        const query = `
        INSERT INTO files (
            name,
            path,
            product_id
        )VALUES ($1, $2, $3)
        RETURNING id
        `
        const values = [
            filename,
            path,
            product_id

        ]
        
        return db.query(query, values)

    },

    async delete(id) {

        //retirar arquivo do banco e da pasta
        try{
            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = result.rows[0]
    
    
            // unlinkSync espera fazer a sincronização
            fs.unlinkSync(file.path)   //onde quero quer delete

            return db.query(`
            DELETE FROM files WHERE id = $1
        `, [id])

        }catch(err) {
            console.error(err)
        }
    }
}