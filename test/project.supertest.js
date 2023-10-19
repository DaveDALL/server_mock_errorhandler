import mongoose from 'mongoose'
import { expect } from 'chai'
import supertest from 'supertest'
import CONFIG from '../config/config.env.js'
import encrypt from '../config/bcrypt.js'
import DAOS from '../src/dao/daos.factory.js'
import { createCart } from './setup.test.js'
const { PORT, MONGO_URL } = CONFIG
const { CartDAO } = DAOS
const { passHashing, validatePass } = encrypt
const requester = supertest(`http://localhost:${PORT}`)

describe('Test de Autenticación', () => {
    //let cookie
    before(async () => {
        await mongoose.connect(MONGO_URL)
    })


    it('[POST] - /userRegistration - Test de registro de usuario', async () => {
        try{
            let createdCart = await createCart()
            console.log(createdCart)
            let hashedPass = passHashing('abcdef')
            const mockUser = {
                userName: 'jorge',
                lastName: 'cuacuas',
                userMail:'jcuacuas@mail.com',
                userPassword: hashedPass,
                cartId: createdCart._id,
                userRoll: 'USUARIO'
            }
            setTimeout(() => {
            }, "1000")
            const respuesta = await requester.post('/authRegistration').send(mockUser)
            console.log(respuesta)
            expect(respuesta).to.be.ok
        }catch(err) {

        }
    })
})