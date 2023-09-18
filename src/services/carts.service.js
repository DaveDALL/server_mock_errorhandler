import DAOS from '../dao/daos.factory.js'
import ticketService from '../services/ticket.service.js'
const { CartDAO, ProductDAO, UserDAO } = DAOS

const getCartByIdService = async (cid) => {
    try {
        let cart = await CartDAO.getCartById(cid)
        if(cart){
            return cart
        }else return {}
    }catch(err) {
        console.log('Error al obtener el cart ' + err)
        throw new Error('Error al obtener el cart ')
    }
}

const newCartService = async () => {
    try{
        let cartCreatedResult = await CartDAO.createCart()
        if(cartCreatedResult) {
            return cartCreatedResult
        }else return {}
    }catch(err) {
        console.log('Error al crear el cart ' + err)
        throw new Error('Error al crear el cart ')
    }
}

const updateCartService = async (cid, productId, qty) => {
    try {
        let updatedCartResult = await CartDAO.updateCartById(cid, productId, qty)
        if(updatedCartResult) {
            return updatedCartResult
        }else return {}
    }catch(err) {
        console.log('Error al actualizar el cart ' + err)
        throw new Error('Error al actualizar el cart ')
    }
}

const delProductFromCartService = async (cid, pid) => {
    try {
        let deletedProductResult = await CartDAO.deleteProductFromCart(cid, pid)
        if(deletedProductResult) {
            return deletedProductResult
        }else return {}
    }catch(err) {
        console.log('Error borrar el producto del Cart ' + err)
        throw new Error('Error borrar el producto del Cart ')
    }
}

const deleteCartService = async (cid) => {
    try {
        let deletedCartResult = await CartDAO.deleteCartById(cid)
        if(deletedCartResult) {
            return deletedCartResult
        }else return {}
    }catch(err) {
        console.log('No es posible borrar el cart con mongoose '+ err)
    }
}

const purchaseCartService = async (cid) => {
    try {
        let userByCart = await UserDAO.getUserByCart(cid)
        let {userMail, cartId} = userByCart
        let products = cartId.products
        let amount = 0
        let ticket = {}
        let productsInStock = []
        let productsOutStock = []
        await products.map(async product => {
            try{
                let {productId, qty} = product
                if(productId.stock >= qty) {
                    product.productId.stock = productId.stock - qty
                    amount += qty * productId.price
                    productsInStock.push({productId: productId._id, qty: qty, subtotal: qty * productId.price})
                    await ProductDAO.updateProduct(product.productId)
                    await CartDAO.deleteProductFromCart(cartId, productId._id)
                } else productsOutStock.push(productId._id)
            }catch(err) {
                console.log('Error al actualizar el producto en MongoDB' + err)
            }
        })
        let ticketCreated = await ticketService.createTicketService(productsInStock, amount, userMail)
        if(ticketCreated) {
            ticket = await ticketService.getTicketbyId(ticketCreated._id)
        }
        let createdTicketResult = {ticket, productsOutStock}
        return createdTicketResult
    }catch(err) {
        console.log(err)
    }
}

export default {
    getCartByIdService,
    newCartService,
    updateCartService,
    delProductFromCartService,
    deleteCartService, 
    purchaseCartService
}