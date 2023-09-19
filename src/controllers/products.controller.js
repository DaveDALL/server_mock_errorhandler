import productService from '../services/products.service.js'
import errorHandler from '../errorMiddleware/controlError.middleware.js'
import CustomizedError from '../utils/errorHandler/errorHandler.customErrors.js'
import EError from '../utils/errorHandler/errorHandler.enums.js'
import { generateErrorInfo } from '../utils/errorHandler/errorHandler.info.js'
const {conditionalSearchProductsService, searchProductByIdService, newProductService, productUpdateService, deleteProductService} = productService

const conditionalSearchProductsController = async (req, res) => {
    let conditions = req.query
    try {
        let requiredProducts = await conditionalSearchProductsService(conditions)
        let {totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage} = requiredProducts
        let prevPageLink = (prevPage ? (req.protocol + '://' + req.get('host') + req.originalUrl.replace(`pageNum=${page}`, `pageNum=${Number(page) - 1}`)) : null)
        let nextPageLink = (nextPage ? (req.protocol + '://' + req.get('host') + req.originalUrl.replace(`pageNum=${page}`, `pageNum=${Number(page) + 1}`)) : null)

        res.status(200).send({
            status: 'success',
            payload: requiredProducts.docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: prevPageLink,
            nextLink: nextPageLink
        })
    }catch(err) {
        console.log('No es posible obtener los productos desde el servicio de productos ' + err)
        res.status(500).send({status: 'error', error: 'No es posible obtener productos con mongoose'})
    }
}

const searchProductByIdController = async (req, res, next) => {
    try {
        let {pid} = req.params
        if(!pid) {
            CustomizedError.createError({
                name: 'Error en el producto',
                cause: generateErrorInfo(EError.PRODUCT_INVALID_PID_ERROR, pid),
                message: 'No se cuenta con el parámetro pid para buscar el producto',
                code: EError.PRODUCT_INVALID_PID_ERROR
            })
        }
        let foundProduct = await searchProductByIdService(pid)
        if(foundProduct) {
            res.status(200).send({status: 'success', payload: foundProduct})
        }else {
            CustomizedError.createError({
                name: 'Error en el producto',
                cause: generateErrorInfo(EError.PRODUCT_INVALID_PID_ERROR, pid),
                message: 'No se cuenta con el parámetro correcto pid para buscar el producto',
                code: EError.PRODUCT_INVALID_PID_ERROR
            })
        }
    }catch(err) {
        console.log('\x1b[31mNo es posible crear el producto\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

const newProductController = async (req, res, next) => {
    let newProduct = req.body
    try {
        let {code, title, description, thumbnails, price, stock, category} = newProduct
        if(!code || !title || !description || thumbnails.length <= 0 || !price || !stock || !category) {
            CustomizedError.createError({
                name: 'Error en el producto',
                cause: generateErrorInfo(EError.PRODUCT_INVALID_DATA_ERROR, newProduct),
                message: 'No se cuenta con todos los parámetros requeridos para crear el producto',
                code: EError.PRODUCT_INVALID_DATA_ERROR
            })
        }
        let createdProductResult = await newProductService(newProduct)
        if(createdProductResult) {
            res.status(200).send({status: 'success', payload: createdProductResult})
        }else {
            CustomizedError.createError({
                name: 'Error en el producto',
                cause: generateErrorInfo(EError.PRODUCT_INVALID_DATA_ERROR, newProduct),
                message: 'No se cuenta con todos los parámetros requeridos o no son válidos para crear el producto',
                code: EError.PRODUCT_INVALID_DATA_ERROR
            })
        }
    }catch(err) {
        console.log('\x1b[31mNo es posible crear el producto\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err) 
    }
    
}

const productUpdateController = async (req, res, next) => {
    let productToUpdate = req.body
    try {
        let {_id, code, title, description, thumbnails, price, stock, category} = productToUpdate
        if(!_id, !code || !title || !description || thumbnails.length <= 0 || !price || !stock || !category) {
            CustomizedError.createError({
                name: 'Error en el producto',
                cause: generateErrorInfo(EError.PRODUCT_INVALID_DATA_ERROR, productToUpdate),
                message: 'No se cuenta con todos los parámetros requeridos para actualizar el producto',
                code: EError.PRODUCT_INVALID_DATA_ERROR
            })
        }
        let productUpdatedResult = await productUpdateService(productToUpdate)
        if(productUpdatedResult){
            res.status(200).send({status:'success', payload: productUpdatedResult})
        }else {
            CustomizedError.createError({
                name: 'Error en el producto',
                cause: generateErrorInfo(EError.PRODUCT_INVALID_DATA_ERROR, productToUpdate),
                message: 'No se cuenta con todos los parámetros requeridos o no son válidos para actualizar el producto',
                code: EError.PRODUCT_INVALID_DATA_ERROR
            })
        }  
    }catch(err) {
        console.log('\x1b[31mNo es posible crear el producto\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

const deleteProductController = async (req, res, next) => {
    try {
        let {pid} = req.params
        if(!pid) {
            CustomizedError.createError({
                name: 'Error en el producto',
                cause: generateErrorInfo(EError.PRODUCT_INVALID_PID_ERROR, pid),
                message: 'No se cuenta con el parámetro pid para borrar el producto',
                code: EError.PRODUCT_INVALID_PID_ERROR
            })
        }
        let productDeletedResult = await deleteProductService(pid)
        if(productDeletedResult) {
            res.status(200).send({status: 'success', payload: productDeletedResult})
        }else {
            CustomizedError.createError({
                name: 'Error en el producto',
                cause: generateErrorInfo(EError.PRODUCT_INVALID_PID_ERROR, pid),
                message: 'No se cuenta con el parámetro correcto pid para borrar el producto',
                code: EError.PRODUCT_INVALID_PID_ERROR
            })
        }
    }catch(err) {
        console.log('\x1b[31mNo es posible crear el producto\n' + err + '\n\x1b[33m[code:] ' + err.code + '\n\x1b[32m[casue:] ' + err.cause + '\x1b[0m')
        next(err)
    }
}

export default {
    conditionalSearchProductsController,
    searchProductByIdController,
    newProductController,
    productUpdateController,
    deleteProductController
}