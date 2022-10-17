const express = require('express')
const { createRoom, getRooms, join_Room, leave_Room, find_Room } = require('../controllers/roomControllers')
const router =  express.Router()

router.route('/room/create').post(createRoom)
router.route('/room/leave').post(leave_Room)
router.route('/room/').get(getRooms).post(join_Room)
router.route('/room/search').post(find_Room)

module.exports = router