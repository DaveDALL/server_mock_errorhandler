import userService from '../services/user.service.js'
import CustomizedError from '../utils/errorHandler/errorHandler.customErrors.js'
import EError from '../utils/errorHandler/errorHandler.enums.js'
import { generateErrorInfo } from '../utils/errorHandler/errorHandler.info.js'
const { getUserByEmailService, updateUserRollService, userMailPassRecoveryService, userLinkVerifyService } = userService

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

const userMailPassRecoveryController = async (req, res, next) => {
    try {
        let { email } = req.body
        if(!email) {
            CustomizedError.createError({
                name: 'Error al recuperar el usuario',
                cause: generateErrorInfo(EError.USER_INVALID_DATA_ERROR, email),
                message: 'No se cuenta con el parámetro para recuperar el usuario',
                code: EError.USER_INVALID_DATA_ERROR
            })
        }
        let mailSendResult = userMailPassRecoveryService(email)
        if(!mailSendResult){
            res.status()
        }
        res.status(200).send({status: 'success', payload: mailSendResult})
    }catch(err) {
        req.logger.warning(`No es posible enviar el correo con el servicio`)
        next(err)
    }

}

const userPassLinkRecoveryController = async (req, res, next) => {
    let {link} = req.params
    let linkVerify = await userLinkVerifyService(link)
    if(linkVerify) {
        res.render('passChange', {})
    }else {
        res.status(401).send({status: 'error', error: 'No esta autorizado para realizar la recuperación'})
    }
}

export default {
    getUserByEmailController,
    updateUserRollController,
    userMailPassRecoveryController,
    userPassLinkRecoveryController,
}