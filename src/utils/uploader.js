import multer from 'multer'
import __dirname from '../../dirPath.js'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { uid } = req.params
        const directory = `${__dirname}/public/customerInfo/${uid}`
        const existDir = fs.existsSync(directory)
        if(!existDir) {
            return fs.mkdir(directory, error => cb(error, dir))
        }
        switch(file.mimetype) {
            case 'image/jpeg' || 'image/png':
                fs.mkdir(`${directory}/profile`)
                return cb(null, `${directory}/profile`)
            case 'application/pdf':
                fs.mkdir(`${directory}/documents`)
                return cb(null, `${directory}/documents`)
        }
    }
})