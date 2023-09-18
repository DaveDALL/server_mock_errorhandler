import express from 'express'
import passport from 'passport'
import viewsController from '../controllers/views.controller.js'
import userRollController from '../controllers/userRollValid.controller.js'
const { Router } = express
const viewsRouter = new Router()
const {userRegistrationViewController, userLoginController, userLogoutController, productViewController, cartViewController} = viewsController
const { isUserRollValid } = userRollController

viewsRouter.get('/userRegistration', userRegistrationViewController)

viewsRouter.get('/', userLoginController)

viewsRouter.get('/logout', userLogoutController)

viewsRouter.get('/products', passport.authenticate('jwtAuth', {session:false}), productViewController) 

viewsRouter.get('/carts/:cid', passport.authenticate('jwtAuth', {session:false}), isUserRollValid, cartViewController)


export default viewsRouter