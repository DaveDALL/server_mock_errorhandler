import authService from '../services/auth.service.js'
import errorHandler from '../errorMiddleware/controlError.middleware.js'
import CustomizedError from '../utils/errorHandler/errorHandler.customErrors.js'
import EError from '../utils/errorHandler/errorHandler.enums.js'
import { generateErrorInfo } from '../utils/errorHandler/errorHandler.info.js'
const {authRegistrationService, authLoginService} = authService

const authRegistrationController = async (req, res, next) => {
    try {
        let user = req.body
        if(!user.userName || !user.lastName || !user.userMail || !user.userPassword) {
            CustomizedError.createError({
                name: 'Error de registro al crear el usuario',
                cause: generateErrorInfo(EError.USER_REGISTRATION_DATA_ERROR, user),
                message: 'Falla en los datos de las propiedades al crear el usuario durante el registro',
                code: EError.USER_REGISTRATION_DATA_ERROR
            })
        }
        await authRegistrationService(user)
        res.redirect('/')
    }catch(err) {
        console.log('\x1b[31mNo es posible crear el usuario\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

const authLoginController = async (req, res) => {
    try {
        let user = req.body
        if(!user.userMail || !user.userPassword) {
            CustomizedError.createError({
                name: 'Error de autenticación del usuario',
                cause: generateErrorInfo(EError.USER_INVALID_DATA_ERROR, user),
                message: 'El correo electronico o la contraseña no son validos',
                code: EError.USER_INVALID_DATA_ERROR
            })
        }
        let userInfo = await authLoginService(user)
        let {token, foundUser} = userInfo
        if(userInfo) {
            req.session.userMail = foundUser.userMail
            req.session.userName = foundUser.userName
            req.session.lastName = foundUser.lastName || ' '
            req.session.userRoll = foundUser.userRoll
            res.cookie('jwtCookie', token).redirect('/products')
        }else res.redirect('/')
    }catch(err) {
        console.log('\x1b[31mNo es posible iniciar sesion\n' + err + '\x1b[0m')
        res.redirect('/userRegistration')
    }
}

export default {
    authRegistrationController,
    authLoginController
}