import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, unique + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|webp/
        const valid = allowed.test(path.extname(file.originalname).toLowerCase())
        cb(null, valid)
    }
})