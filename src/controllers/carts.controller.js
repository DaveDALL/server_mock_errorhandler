import cartService from '../services/carts.service.js'
import errorHandler from '../errorMiddleware/controlError.middleware.js'
import CustomizedError from '../utils/errorHandler/errorHandler.customErrors.js'
import EError from '../utils/errorHandler/errorHandler.enums.js'
import { generateErrorInfo } from '../utils/errorHandler/errorHandler.info.js'
const {getCartByIdService, newCartService, updateCartService, delProductFromCartService, deleteCartService, purchaseCartService} = cartService

const getCartByIdController = async (req, res, next) => {
    try {
        let {cid} = req.params
        if(!cid) {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_CID_ERROR, cid),
                message: 'No se cuenta con el parámetro cid para buscar el cart',
                code: EError.CART_INVALID_CID_ERROR
            })
        }
        let cart = await getCartByIdService(cid)
        if(cart) {
            res.status(200).send({status: 'success', payload: cart})
        }else {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_CID_ERROR, cid),
                message: 'No se cuenta con el parámetro correcto cid para buscar el cart',
                code: EError.CART_INVALID_CID_ERROR
            })
        }
    }catch(err) {
        console.log('\x1b[31mNo es posible obtener el cart con el servicio\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

const newCartController = async (req, res, next) => {
    try{
        let cartCreatedResult = await newCartService()
        if(cartCreatedResult) {
            res.status(200).send({status: 'success', payload: cartCreatedResult})
        }else {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_CID_ERROR, cid),
                message: 'No se pudo crear el cart',
                code: EError.CART_INVALID_CID_ERROR
            })
        }
        
    }catch(err) {
        console.log('\x1b[31mNo es posible crear el cart con el servicio\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

const updateCartController = async (req, res, next) => {
    try {
        let {cid} = req.params
        let {productId, qty} = req.body
        if(!cid || !productId || !qty || qty <= 0) {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_DATA_ERROR, {cid, productId, qty}),
                message: 'Los parámetros para actualizar el cart no estan completos',
                code: EError.CART_INVALID_DATA_ERROR
            })
        }
        let updatedCartResult = await updateCartService(cid, productId, qty)
        if(updatedCartResult) {
            res.status(200).send({status: 'success', payload: updatedCartResult})
        }else {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_DATA_ERROR, {cid, productId, qty}),
                message: 'Los parámetros para actualizar el cart no estan completos o no son válidos',
                code: EError.CART_INVALID_DATA_ERROR
            })
        }
    }catch(err) {
        console.log('\x1b[31mNo es posible actualizar el cart con el servicio\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

const delProductFromCartController = async (req, res, next) => {
    try {
        let {cid, pid} = req.params
        if(!cid || !pid) {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_DATA_ERROR, {cid, pid}),
                message: 'Los parámetros para actualizar el cart no estan completos',
                code: EError.CART_INVALID_DATA_ERROR
            })
        }
        let updatedCartResult = await delProductFromCartService(cid, pid)
        if(updatedCartResult) {
            res.status(200).send({status: 'success', payload: updatedCartResult})
        }else {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_DATA_ERROR, {cid, pid}),
                message: 'Los parámetros para actualizar el cart no estan completos o no son válidos',
                code: EError.CART_INVALID_DATA_ERROR
            })
        }
    }catch(err) {
        console.log('\x1b[31mNo es posible borrar el producto con el servicio\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

const deleteCartController = async (req, res, next) => {
    try {
        let {cid} = req.params
        if(!cid) {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_CID_ERROR, cid),
                message: 'No se cuenta con el parámetro cid para buscar el cart',
                code: EError.CART_INVALID_CID_ERROR
            })
        }
        let deletedCartResult = await deleteCartService(cid)
        if(deletedCartResult) {
            res.status(200).send({status: 'success', payload: deletedCartResult})
        } else {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_CID_ERROR, cid),
                message: 'No se cuenta con el parámetro cid para borrar el cart',
                code: EError.CART_INVALID_CID_ERROR
            })
        }
    }catch(err) {
        console.log('\x1b[31mNo es posible borrar el cart con el servicio\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

const purchaseCartController = async (req, res, next) => {
    try{
        let {cid} = req.params
        if(!cid) {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_CID_ERROR, cid),
                message: 'No se cuenta con el parámetro cid para buscar el cart',
                code: EError.CART_INVALID_CID_ERROR
            })
        }
        let userByCart = await purchaseCartService(cid)
        if(userByCart) {
            res.status(200).send({status: 'success', payload: userByCart})
        }else {
            CustomizedError.createError({
                name: 'Error en el cart',
                cause: generateErrorInfo(EError.CART_INVALID_CID_ERROR, cid),
                message: 'No se cuenta con el parámetro correcto cid para buscar el usuario',
                code: EError.CART_INVALID_CID_ERROR
            })
        }
    }catch(err) {
        console.log('\x1b[31mNo es posible crear el ticket con el servicio\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

export default {
    getCartByIdController,
    newCartController,
    updateCartController,
    delProductFromCartController,
    deleteCartController,
    purchaseCartController
}
