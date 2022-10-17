const { checkUser, addUser, removeUser, findUser } = require("../data/user")
const { BadRequestError } = require("../errors")
const { sendResponseWithCookie } = require("../utils/jwt")
const { StatusCodes } = require('http-status-codes')
const { checkRoom } = require("../data/room")

const login = (req, res) => {
    const user = req.body
    const room = req.signedCookies.room
    const isExist = checkUser(user)
    if (isExist) throw new BadRequestError('Username has been taken')
    else {
        addUser(user)
    }
    if(room){
        res.cookie('room', null, {
            httpOnly: true,
            expires: new Date(Date.now())
        })
    }
    sendResponseWithCookie(res, StatusCodes.CREATED, 'accessToken', user)
}

const logout = (req, res) => {
    const user = req.body
    removeUser(user)
    res.cookie('accessToken', null, {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({ msg: 'Log Out !!!' })
}

const getInfo = (req, res) => {
    const { user, room } = req.body
    const userInfo = findUser(user)
    if(room){
        const roomInfo = checkRoom(room)
        return res.status(StatusCodes.OK).json({ user : userInfo, room : roomInfo})
    }
    res.cookie('room', null, {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({ user : userInfo})
}   


module.exports = {
    login,
    logout,
    getInfo
}