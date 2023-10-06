import express from 'express'
import passport from 'passport'
import userController from '../controllers/user.controller.js'
const { Router } = express
const { getUserByEmailController, updateUserRollController, userMailPassRecoveryController, userPassLinkRecoveryController } = userController
const userRouter = Router()

userRouter.post('/currentUser', passport.authenticate('jwtAuth', {session:false}), getUserByEmailController)

userRouter.post('/premium/:uid', passport.authenticate('jwtAuth', {session:false}), updateUserRollController)

userRouter.post('/recoveryPass', userMailPassRecoveryController)

userRouter.get('/recoveryPassLink/:link', userMailPassRecoveryController)

userRouter.post('/passChange', )

export default userRouter
