const Base = require('./Base')

Base.init({ table: 'files' })


module.exports = {

    ...Base,
}

    // async delete(id) {

    //     //retirar arquivo do banco e da pasta
    //     try {
    //         const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
    //         const file = result.rows[0]


    //         // unlinkSync espera fazer a sincronização
    //         fs.unlink(file.path, (err) => {
    //             if (err) throw err
                
    //             return db.query(`
    //         DELETE FROM files WHERE id = $1
    //     `, [id])
    //         })   //onde quero quer delete
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }






