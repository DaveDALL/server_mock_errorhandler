import User from '../../models/users.model.js'
import emailTransport from '../../../config/transport.email.js'

export class UserMongoDAO {

    constructor() {

    }

    async createUser (user) {
        try {
            let createdUser = await User.create(user)
            if(createdUser) {
                return createdUser
            }else return {}
        }catch(err) {
            throw new Error('No se pudo crear el usuario en MongoDB con mongoose ', {cause: err})
        }
    }

    async getUserByEmail (mail) {
        try {
            let foundUser = await User.find({userMail: mail})
            if(foundUser.length > 0) {
                return foundUser
            }else return []
        }catch(err) {
            throw new Error('No se pudo confirmar el usuario en MongoDB con mongoose ', {cause: err})
        }
    }

    async getUserByCart (cid) {
        try{
            let userByCart = await User.findOne({"cartId": cid})
            if(userByCart) {
                return userByCart
            } else return {}
        }catch(err) {
            throw new Error('No se pudo confirmar el usuario en MongoDB con mongoose ', {cause: err})
        }
    }

    async updateUserRoll (uid, actualRoll) {
        console.log(uid, actualRoll)
        try {
            let updateUserRollResult = {}
            let foundUser = await User.find({_id: uid})
            if(foundUser[0].userRoll === actualRoll && foundUser[0].userRoll !== 'PREMIUM') {
                updateUserRollResult = await User.updateOne({_id: uid}, {$set: {userRoll: 'PREMIUM'}})
            }else if(foundUser[0].userRoll === actualRoll && foundUser[0].userRoll !== 'USUARIO') {
                updateUserRollResult = await User.updateOne({_id: uid}, {$set: {userRoll: 'USUARIO'}})
            } else throw new Error('No fue posible actualizar el roll del usuario en MongoDB con mongoose')
            return updateUserRollResult
        }catch(err) {
            throw new Error('No fue posible actualizar el roll del usuario en MongoDB con mongoose', {cause: err})
        }
    }

    async userPassRecovery (mail, accessLink) {
        let passToken
        if(!accessLink) {
            passToken = 'text'
        }
    } 

    async sendMail (fromAddress, toAddress, subject, mailBody, attach) {
        try{
            let mailSendResult = await emailTransport.sendMail({
                from: fromAddress,
                to: toAddress,
                subject: subject,
                html: mailBody,
                attachments: attach
            })
    
            return mailSendResult
        }catch(err) {
            throw new Error('No fue posible enviar el correo al usuario', {cause: err})
        }
        
    }
}