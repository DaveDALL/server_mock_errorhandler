import express from 'express'
import passport from 'passport'
import cartController from '../controllers/carts.controller.js'
import userRollController from '../controllers/userRollValid.controller.js'
const { Router } = express
const router = new Router()
const {getCartByIdController, newCartController, updateCartController, delProductFromCartController, deleteCartController, purchaseCartController} = cartController
const { isUserRollValid } = userRollController

router.get('/:cid', passport.authenticate('jwtAuth', {session:false}), isUserRollValid, getCartByIdController)

router.post('/newCart', passport.authenticate('jwtAuth', {session:false}), isUserRollValid, newCartController)

router.put('/:cid', passport.authenticate('jwtAuth', {session:false}), isUserRollValid, updateCartController)

router.delete('/:cid/products/:pid', passport.authenticate('jwtAuth', {session:false}), isUserRollValid, delProductFromCartController)

router.delete('/cart/:cid', passport.authenticate('jwtAuth', {session:false}), isUserRollValid, deleteCartController)

router.post('/:cid/purchase', purchaseCartController)

export default router

