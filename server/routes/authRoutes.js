const express = require('express')
const router = express.Router()

const {
    login, logout, getInfo
} = require('../controllers/authController')
const { authenticateUser, authenticateRoom } = require('../middlewares/authentication')

router.route('/auth/login').post(login)
router.route('/auth/logout').post(logout)
router.route('/auth/').get(authenticateUser,authenticateRoom,getInfo)
module.exports = router