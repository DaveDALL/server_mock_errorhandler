import express from 'express'
import passport from 'passport'
import cartController from '../controllers/carts.controller.js'
import userpolicies from '../middlewares/userMiddleware/userRollValid.middleware.js'
const { Router } = express
const router = new Router()
const {getCartByIdController, newCartController, updateCartController, delProductFromCartController, deleteCartController, purchaseCartController} = cartController

router.get('/:cid', passport.authenticate('jwtAuth', {session:false}), userpolicies(['USUARIO']), getCartByIdController)

router.post('/newCart', passport.authenticate('jwtAuth', {session:false}), userpolicies(['USUARIO']), newCartController)

router.put('/:cid', passport.authenticate('jwtAuth', {session:false}), userpolicies(['USUARIO']), updateCartController)

router.delete('/:cid/products/:pid', passport.authenticate('jwtAuth', {session:false}), userpolicies(['USUARIO']), delProductFromCartController)

router.delete('/cart/:cid', passport.authenticate('jwtAuth', {session:false}), userpolicies(['ADMIN']), deleteCartController)

router.post('/:cid/purchase', userpolicies(['USUARIO']), purchaseCartController)

export default router

