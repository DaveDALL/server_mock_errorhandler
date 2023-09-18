import DAOS from '../dao/daos.factory.js'
const { UserDAO } = DAOS

const getUserByEmailService = async (mail) => {
    try {
        let getUserResult = await UserDAO.getUserByEmail(mail)
        if(getUserResult.length > 0) {
            return getUserResult
        } else return []
    }catch(err) {
        console.log('Error al obtener al usuario con mongoose '+ err)
        throw new Error('Error al obtener al usuario con mongoose ')
    }
}

export default {
    getUserByEmailService
}