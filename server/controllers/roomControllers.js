const { StatusCodes } = require("http-status-codes")
const { checkRoom, addRoom, getAllRooms, joinRoom, leaveRoom, findRoom } = require("../data/room")
const { BadRequestError } = require("../errors")
const { sendResponseWithCookie } = require("../utils/jwt")

const createRoom = (req, res) => {
    const newRoom = req.body
    const isExist = checkRoom(newRoom)
    if (isExist) throw new BadRequestError('Tên phòng đã tồn tại')
    else addRoom(newRoom)
    sendResponseWithCookie(res, StatusCodes.CREATED, 'room', newRoom)
}

const getRooms = (req, res) => {
    const rooms = getAllRooms()
    res.status(StatusCodes.OK).json({ err: false, rooms })
}

const join_Room = (req, res) => {
    const { user, room } = req.body
    const searchedRoom = joinRoom(user, room)
    if (!searchedRoom) {
        throw new BadRequestError('Error')
    }
    sendResponseWithCookie(res, StatusCodes.OK, 'room', searchedRoom)
}

const leave_Room = (req, res) => {
    const { user, room } = req.body
    leaveRoom(user, room)
    res.cookie('room', null, {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({ msg: 'Leave !!!' })
}

const find_Room = (req, res) => {
    const { key } = req.body
    const rooms = findRoom(key)
    res.status(StatusCodes.OK).json({ rooms })
}


module.exports = {
    createRoom,
    getRooms,
    join_Room,
    leave_Room,
    find_Room
}