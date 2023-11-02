import CONFIG from '../../config/config.env.js'
const {PORT} = CONFIG

const userRegistrationViewController = (req, res) => {
    res.render('register', {})
}

const userLoginController = (req, res) => {
    res.render('login', {})
}

const userLogoutController = (req, res) => {
    req.session.destroy (err => {
        if(err) res.send('Problemas con el logout!!')
        res.clearCookie('jwtCookie').redirect('/')
    })
}

const productViewController = (req, res) => {
    let {userName, lastName, userMail, userRoll} = req.session
    res.render('products', {name: userName, lastName: lastName, mail: userMail, roll: userRoll, port: PORT})
}

const cartViewController = (req, res) => {
    res.status(200).render('cart', {port: PORT})
}

const userPassRecoveryViewController = (req, res) => {
    res.render('recovery', {})
}

const uploaderController = (req, res) =>{
    res.render('uploads', {})
}

export default {
    userRegistrationViewController,
    userLoginController,
    userLogoutController,
    productViewController,
    cartViewController,
    userPassRecoveryViewController,
    uploaderController
}