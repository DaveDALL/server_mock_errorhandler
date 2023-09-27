import userService from '../services/user.service.js'
import errorHandler from '../errorMiddleware/controlError.middleware.js'
import CustomizedError from '../utils/errorHandler/errorHandler.customErrors.js'
import EError from '../utils/errorHandler/errorHandler.enums.js'
import { generateErrorInfo } from '../utils/errorHandler/errorHandler.info.js'
const { getUserByEmailService } = userService

const getUserByEmailController = async (req, res, next) => {
    try{
        let {mail} = req.body
        if(!mail) {
            CustomizedError.createError({
                name: 'Error en el usuario',
                cause: generateErrorInfo(EError.USER_MAIL_ERROR, mail),
                message: 'No se cuenta con el parámetro para buscar el usuario',
                code: EError.USER_MAIL_ERROR
            })
        }
        let getUserResult = await getUserByEmailService(mail)
        if(getUserResult.length > 0) {
            res.status(200).send({status: 'success', payload: getUserResult})
        }else {
            CustomizedError.createError({
                name: 'Error en el usuario',
                cause: generateErrorInfo(EError.USER_MAIL_ERROR, mail),
                message: 'No se cuenta con el parámetro correcto para buscar el usuario',
                code: EError.USER_MAIL_ERROR
            })
        }
        
    }catch(err) {
        req.logger.warning(`No es posible obtener al usuario con el servicio`)
        next(err)
    }
}

export default {
    getUserByEmailController
}