import mongoose from 'mongoose'
import CONFIG from '../../config/config.env.js'
import CustomizedError from '../utils/errorHandler/errorHandler.customErrors.js'
import EError from '../utils/errorHandler/errorHandler.enums.js'
import { generateErrorInfo } from '../utils/errorHandler/errorHandler.info.js'
const { MONGO_URL } = CONFIG

export default {
    connect: async () => {
        return await mongoose.connect(MONGO_URL, {}).then(connection => {
            console.log('DataBase successful connection')
            if(!connection) {
                CustomizedError.createError({
                    name: 'Error en el usuario',
                    cause: generateErrorInfo(EError.DATABASE_CONECTION_ERROR, null),
                    message: 'No se cuenta con el parámetro para buscar el usuario',
                    code: EError.DATABASE_CONECTION_ERROR
                })
            }
        }).catch(err => console.log('Error at Database connection ' + err))
    }
}