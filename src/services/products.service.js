import DAOS from '../dao/daos.factory.js'
import logger from '../utils/logging/factory.logger.js'
const { ProductDAO } = DAOS

const conditionalSearchProductsService = async (conditions) => {
    try{
        let requiredProducts = await ProductDAO.getProductsByFilter(conditions)
        if(requiredProducts)
        {
            return requiredProducts
        } else {
            logger.error('No se pudieron obtener los productos en MongoDB')
            return {}
        }
        
    }catch(err) {
        throw new Error('Error al obtener los productos desd el DAO ', {cause: err})
    }
}


const searchProductByIdService = async (pid) => {
    try {
        let foundProduct = await ProductDAO.getProductById(pid)
        if(foundProduct) {
            return foundProduct
        } else {
            logger.debug('No se encontró el producto con el ID')
            return {}
        }
    }catch(err) {
        throw new Error('Error al buscar el producto con el ID ', {cause: err})
    }
}

const newProductService = async (newProduct) => {
    try {
        let productCreatedResult = await ProductDAO.createProduct(newProduct)
        if(productCreatedResult) {
            return productCreatedResult
        }else {
            logger.error('No fue posible crear el producto')
            return {}
        }
    }catch(err) {
        throw new Error('No es posible crear el producto en mongoose', {cause: err})
    }
}

const productUpdateService = async (productToUpdate) => {
    try {
        let productUpdatedResult = await ProductDAO.updateProduct(productToUpdate)
        if(productUpdatedResult) {
            return productUpdatedResult
        }else {
            logger.error('No se pudo actualizar el producto en Mongo DB')
            return {}
        }
    }catch(err) {
        throw new Error('Existe un error al tratar de actualizar el producto con mongoose', {cause: err})
    }
}

const deleteProductService = async (pid) => {
    try {
        let productDeletedResult = await ProductDAO.deleteProductById(pid)
        if(productDeletedResult) {
            return productDeletedResult
        }else {
            logger.debug('NO se pudo borrar el producto en Mongo DB')
            return {}
        }  
    }catch(err) {
        throw new Error('No es posible eliminar el producto con mongoose ', {cause: err})
    }
}

export default {
    conditionalSearchProductsService,
    searchProductByIdService,
    newProductService,
    productUpdateService,
    deleteProductService
}