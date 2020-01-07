const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')  //onde vai as imagens
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`) //nome do arquivo com a data
    }
})

const  fileFilter = (req, file, cb) =>{ //verificar tipo de imagem
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
    .find(acceptedFormat => acceptedFormat == file.mimetype) //se for aceito continua

    if(isAccepted) {
        return cb(null, true);
    }

    return cb (null, false)
}

module.exports = multer({
    storage,
    fileFilter
})