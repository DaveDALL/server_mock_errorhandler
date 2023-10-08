import DAOS from '../dao/daos.factory.js'
import logger from '../utils/logging/factory.logger.js'
import CONFIG from '../../config/config.env.js'
import encrypt from '../../config/bcrypt.js'
const { UserDAO } = DAOS
const { EMAIL_USER, PORT } = CONFIG
const { passHashing, validatePass } =encrypt

const getUserByEmailService = async (mail) => {
    try {
        let getUserResult = await UserDAO.getUserByEmail(mail)
        if(getUserResult.length > 0) {
            return getUserResult
        } else {
            logger.debug('No fue posible encontrar el usuario en MongoDB')
            return []
        }
    }catch(err) {
        throw new Error('Error al obtener al usuario con mongoose ', {cause: err})
    }
}

const updateUserRollService = async (uid, actualRoll) => {
    try{
        let updateUserResult = await UserDAO.updateUserRoll(uid, actualRoll)
        if(updateUserResult) {
            return updateUserResult
        }else {
            logger.debug('No fue posible actualizar el usuario en MongoDB')
            return {}
        }
        
    }catch(err) {
        throw new Error('Error al actualizar el roll del usuario con mongoose ', {cause: err})
    }
}

const userMailPassRecoveryService = async (toAddress) => {
    try {
        let userfound = await UserDAO.getUserByEmail(toAddress)

    if(userfound.length > 0) {
      
        let passRecovery = await UserDAO.userPassRecovery(toAddress)

        let subject = 'Recuperación de Contraseña'
        let mailBody = `
            <h3>Correo de Recuperación de contraseña</h3>
            <p>\n\nEstimado usuario ${toAddress}, enviamos la siguiente notificación con el botón de recuperación de tu contraseña\n\n</p>
            <form action="http://localhost:${PORT}/api/users/recoveryPassLink/${passRecovery.link}" method="get">
                <input type="submit" value="Restablecer Contraseña">
            </form>
            <p>\n\nSin más por el momento enviamos saludos cordiales.</p>
            <p>\n\nAtte.\n\n</p>
            <h4>SuperArticulos</h4>
        `
        let attach = []

        await UserDAO.sendMail(EMAIL_USER, toAddress, subject, mailBody, attach)

        return 'Email con recuperación enviado'
    }else {
        logger.warning('El usuario no se encuentra registrado')
        return null
    }
        
    
    }catch(err) {
        logger.warning('No fue posible enviar con correo con el servicio')
        throw new Error('No fue posible enviar el correo con el servicio', {cause: err})
    }
    
}

const userLinkVerifyService = async (link) => {
    let verifyLinkResult = await UserDAO.verifyLink(link)
    if(verifyLinkResult) {
        return true
    }else return false
}

const userPassChangeService = async (link, userPassMain, userPassSecond) => {
    try {
        if(userPassMain !== userPassSecond) {
            return null
        }else {
            let userLink = UserDAO.getUserLink(link)
            if(!userLink) {
                throw new Error('No es posible recuperar el usuario con link proporcionado')
            }else {
                let user = UserDAO.getUserByEmail(userLink.email)
                isValidPass = validatePass(userPassMain, user[0].userPassword)
                if(isValidPass) {
                    return '0'
                }else {
                    let newUserPass = passHashing(userPassMain)
                    let updateUserPassResult = UserDAO.updateUserPass(user[0]._id, newUserPass)
                    if(updateUserPassResult) {
                        return '1'
                    }else return '-1'
                }
            }
        }
    }catch(err) {
        logger.warning('No fue posible actualizar la contrseña con el servicio')
        throw new Error('No fue posible actualizar la contrseña con el servicio', {cause: err})
    }
}

export default {
    getUserByEmailService,
    updateUserRollService,
    userMailPassRecoveryService,
    userLinkVerifyService,
    userPassChangeService
}