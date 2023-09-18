import DAOS from '../dao/daos.factory.js'
const { ProductDAO } = DAOS

const conditionalSearchProductsService = async (conditions) => {
    try{
        let requiredProducts = await ProductDAO.getProductsByFilter(conditions)
        if(requiredProducts)
        {
            return requiredProducts
        } else throw new Error('No es posible obtener los productos desde el DAO')
        
    }catch(err) {
        console.log('Error al obtener los productos desd el DAO ' + err)
        throw new Error('Error al obtener los productos desd el DAO ')
    }
}


const searchProductByIdService = async (pid) => {
    try {
        let foundProduct = await ProductDAO.getProductById(pid)
        if(foundProduct) {
            return foundProduct
        } else return {}
    }catch(err) {
        console.log('Error al buscar el producto con el ID ' + err)
        throw new Error('Error al buscar el producto con el ID ')
    }
}

const newProductService = async (newProduct) => {
    try {
        let productCreatedResult = await ProductDAO.createProduct(newProduct)
        if(productCreatedResult) {
            return productCreatedResult
        }else return {}
    }catch(err) {
        console.log('No es posible crear el producto ' + err)
        throw new Error('No es posible crear el producto ')
    }
}

const productUpdateService = async (productToUpdate) => {
    try {
        let productUpdatedResult = await ProductDAO.updateProduct(productToUpdate)
        if(productUpdatedResult) {
            return productUpdatedResult
        }else return {}
    }catch(err) {
        console.log('Existe un error al tratar de actualizar el producto ' + err)
        throw new Error('Existe un error al tratar de actualizar el producto ')
    }
}

const deleteProductService = async (pid) => {
    try {
        let productDeletedResult = await ProductDAO.deleteProductById(pid)
        if(productDeletedResult) {
            return productDeletedResult
        }else return {}  
    }catch(err) {
        console.log('No es posible eliminar el producto con mongoose ' + err)
        throw new Error('No es posible eliminar el producto con mongoose ')
    }
}

export default {
    conditionalSearchProductsService,
    searchProductByIdService,
    newProductService,
    productUpdateService,
    deleteProductService
}