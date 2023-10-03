import DAOS from '../dao/daos.factory.js'
import logger from '../utils/logging/factory.logger.js'
const { UserDAO } = DAOS

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

export default {
    getUserByEmailService,
    updateUserRollService
}