import express from 'express'
import passport from 'passport'
import productController from '../controllers/products.controller.js'
import userRollController from '../controllers/userRollValid.controller.js'
const { Router } = express
const router = new Router()
const {conditionalSearchProductsController, searchProductByIdController, newProductController, productUpdateController, deleteProductController} = productController
const { isAdminRollValid } = userRollController

router.get('/', passport.authenticate('jwtAuth', {session:false}), conditionalSearchProductsController)

router.get('/:pid', passport.authenticate('jwtAuth', {session:false}), searchProductByIdController)

router.post('/newProduct', newProductController)

router.put('/updateProduct', passport.authenticate('jwtAuth', {session:false}), isAdminRollValid, productUpdateController)

router.delete('deleteProduct/:pid', passport.authenticate('jwtAuth', {session:false}), isAdminRollValid, deleteProductController)

export default router

//passport.authenticate('jwtAuth', {session:false}), isAdminRollValid