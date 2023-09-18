import DAOS from '../dao/daos.factory.js'
const { TicketDAO } = DAOS

const createTicketService = async (products, amount, purchaser) => {
    try {
        let ticketCreatedResult = await TicketDAO.createTicket(products, amount, purchaser)
        if(ticketCreatedResult) {
            return ticketCreatedResult
        } else {}
    }catch(err) {
        console.log('No fue posible crear el ticket con el servicio ' + err)
        throw new Error('No fue posible crear el ticket con el servicio ')
    }
}

const getTicketbyId = async (tid) => {
    try {
        let ticket = await TicketDAO.getTicketbyId(tid)
        if(ticket) {
            return ticket
        }else return {}
    }catch(err) {
        console.log('No fue posible obtener el ticket con el servicio ' + err)
        throw new Error('No fue posible obtener el ticket con el servicio ')
    }
}

export default {
    createTicketService,
    getTicketbyId
}