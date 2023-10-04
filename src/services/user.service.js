import DAOS from '../dao/daos.factory.js'
import logger from '../utils/logging/factory.logger.js'
import CONFIG from '../../config/config.env.js'
const { UserDAO } = DAOS
const { EMAIL_USER } = CONFIG

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
        let subject = 'Recuperación de Contraseña'
        let mailBody = `
            <h3>Correo de Recuperación de contraseña</h3>
            <p>\n\nEstimado usuario ${toAddress}, enviamos la siguiente notificación con el enlace de recuperación de tu contraseña</p>
            <p>\n\nSin más por el momento enviamos saludos cordiales.</p>
            <p>\n\nAtte.\n\n</p>
            <h4>SuperArticulos</h4>
        `
        let attach = []

        await UserDAO.sendMail(EMAIL_USER, toAddress, subject, mailBody, attach)

        return 'Email con recuperación enviado'
    }else {
        let subject = 'Usuario no registrado'
        let mailBody = `
            <h3>Usuario no registrado</h3>
            <p>\n\nEstimado usuario ${toAddress}, enviamos la siguiente notificación ya que se encuentra registrado en nuestra tienda</p>
            <p>\n\nSin más por el momento enviamos saludos cordiales.</p>
            <p>\n\nAtte.\n\n</p>
            <h4>SuperArticulos</h4>
        `
        let attach = []

        await UserDAO.sendMail(EMAIL_USER, toAddress, subject, mailBody, attach)

        return null
    }
    }catch(err) {
        logger.warning('No fue posible enviar con correo con el servicio')
        throw new Error('No fue posible enviar el correo con el servicio', {cause: err})
    }
    
}

export default {
    getUserByEmailService,
    updateUserRollService,
    userMailPassRecoveryService
}