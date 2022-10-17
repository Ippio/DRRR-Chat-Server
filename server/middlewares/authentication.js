const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

// const auth = async(req,res,next)=>{
//     const authHeader = req.headder.authentication
//     if(!authHeader && !authHeader.starsWith('Bearer')){
//         throw new UnauthenticatedError('No access')
//     }
//     const token = authHeader.split(' ')[1]

//     try {
//         const payload = jwt.verify(token,process.env.JWT_SECRET)

//         req.user = { userId: payload.userId, name: payload.name }
//         next()

//     } catch (error) {
//         throw new UnauthenticatedError('No access')
//     }
// }

const authenticateUser = (req, res, next) => {
    const accessToken = req.signedCookies.accessToken
    if (!accessToken) {
        return next()
    }

    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.body.user = {...payload}
        next()
    } catch (error) {
        console.log(error);
        next()
    }
}

const authenticateRoom = (req, res, next) => {
    const room = req.signedCookies.room
    const {user} = req.body
    if (!room || !user) {
        return next()
    }
    try {
        const payload = jwt.verify(room, process.env.JWT_SECRET)
        req.body.room = {...payload}
        next()
    } catch (error) {
        console.log(error);
        next()
    }
}


module.exports = { authenticateUser, authenticateRoom };