
const userPolicies = (rolls) => {

    return (req, res, next) => {
        if(rolls[0] === 'PUBLIC') return next()
        if(!req.user) res.status(403).send(`<h2>Acceso denegado</h2>`)
        next()
    }
}


// const isUserRollValid = async (req, res, next) => {
//     (await req.user.roll === 'usuario') ? next() : res.status(403).send(`<h2>Acceso denegado</h2>`)
// }

// const isAdminRollValid = async (req, res, next) => {
//     (await req.user.roll === 'admin') ? next() : res.status(403).send(`<h2>Acceso denegado</h2>`)
// }

export default userPolicies

