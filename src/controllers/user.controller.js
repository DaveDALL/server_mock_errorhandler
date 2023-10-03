import userService from '../services/user.service.js'
import CustomizedError from '../utils/errorHandler/errorHandler.customErrors.js'
import EError from '../utils/errorHandler/errorHandler.enums.js'
import { generateErrorInfo } from '../utils/errorHandler/errorHandler.info.js'
const { getUserByEmailService, updateUserRollService } = userService

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

const updateUserRollController = async (req, res, next) => {
    try{
        let {uid} = req.params
        if(!uid) {
            CustomizedError.createError({
                name: 'Error al actualiza el usuario en el usuario',
                cause: generateErrorInfo(EError.USER_INVALID_DATA_ERROR, uid),
                message: 'No se cuenta con el parámetro para actualizar el usuario',
                code: EError.USER_INVALID_DATA_ERROR
            })
        }
        let updateUserResult = await updateUserRollService(uid, req.user.roll)
        res.status(200).send({status: 'success', payload: updateUserResult})
    }catch(err) {
        req.logger.warning(`No es posible actualizar el roll del usuario con el servicio`)
        next(err)
    }
}

export default {
    getUserByEmailController,
    updateUserRollController
}