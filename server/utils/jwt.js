const jwt = require('jsonwebtoken');

const defaultOptions = {
    expiresIn: process.env.JWT_LIFETIME,
};

const createJWT = (payload, options) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        ...defaultOptions,
        ...options
    })
    return token
}

const isTokenValid = (token) => { jwt.verify(token, process.env.JWT_SECRET) }

const sendResponseWithCookie = (res, statusCode, name, data, options) => {
    const cookie = createJWT(data, options)
    // const cookieDuration = 1000 * 60 * 60 * 24 * 99;
    res.cookie(name, cookie, {
        httpOnly: true,
        // expires: new Date(Date.now() + process.env.JWT_COOKIE_LIFITIME * cookieDuration),
        signed: true,
        secure: true
    })
    res.status(statusCode).json({ data, cookie })
}
module.exports = {
    createJWT,
    isTokenValid,
    sendResponseWithCookie
}