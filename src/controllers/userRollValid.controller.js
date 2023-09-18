const isUserRollValid = async (req, res, next) => {
    (await req.user.roll === 'usuario') ? next() : res.status(403).send(`<h2>Acceso denegado</h2>`)
}

const isAdminRollValid = async (req, res, next) => {
    (await req.user.roll === 'admin') ? next() : res.status(403).send(`<h2>Acceso denegado</h2>`)
}

export default {
    isUserRollValid,
    isAdminRollValid
}

