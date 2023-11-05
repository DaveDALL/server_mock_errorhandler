import express from 'express'
import passport from 'passport'
import uploader from '../utils/uploader.js'
import userController from '../controllers/user.controller.js'
const { Router } = express
const { getUserByEmailController, updateUserRollController, userMailPassRecoveryController, userPassLinkRecoveryController, userPassChangeController, uploadDocsController } = userController
const { documentsUploader } = uploader
const userRouter = Router()

let documentsUpload = documentsUploader.fields([{name: 'idDocument', maxCount: 1}, {name: 'addressProof', maxCount: 1}, {name: 'accountStatement', maxCount: 1}])

userRouter.post('/currentUser', passport.authenticate('jwtAuth', {session:false}), getUserByEmailController)

userRouter.post('/premium/:uid', passport.authenticate('jwtAuth', {session:false}), updateUserRollController)

userRouter.post('/recoveryPass', userMailPassRecoveryController)

userRouter.get('/recoveryPassLink/:link', userPassLinkRecoveryController)

userRouter.post('/passChanger', userPassChangeController)

userRouter.post('/:uid/documents', passport.authenticate('jwtAuth', {session:false}), documentsUpload, uploadDocsController)

export default userRouter
