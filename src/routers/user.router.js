import express from 'express'
import passport from 'passport'
import userController from '../controllers/user.controller.js'
const { Router } = express
const { getUserByEmailController } = userController
const userRouter = Router()

userRouter.post('/currentUser', passport.authenticate('jwtAuth', {session:false}), getUserByEmailController)

export default userRouter
