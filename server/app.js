require('dotenv').config()
require('express-async-errors')

const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const authRouter = require('./routes/authRoutes')
const roomRouter = require('./routes/roomRoutes')
const cors = require('cors')
// const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.JWT_SECRET))
app.use('/', authRouter)
app.use('/', roomRouter)

const server = http.createServer(app, {
})

const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
})
// const chatRoom = io.of('/room')
// chatRoom.on('connection', socket => {
//     socket.on('join-room', (user, room) => {
//         socket.join(room)
//         socket.to(room).emit('add-new-member', user)
//     })
//     socket.on('leave-room', (user, room) => {
//         socket.leave(room)
//         socket.to(room).emit('remove-member', user)
//     })
//     socket.on('disconnect', (user) => {
//         // console.log(`offline`)
//     })
//     socket.on('send-message', (user, message, room) => {
//         socket.to(room).emit('receive-message', user, message)
//     })
//     socket.on('send-private-message', (user, message, recipient) => {
//         socket.to(recipient).emit('receive-private-message', user, message)
//     })
// })
io.on(('connection'), (socket) => {
    socket.on('join-room', (user, room) => {
        socket.join(room)
        socket.to(room).emit('add-new-member', user)
    })
    socket.on('leave-room', (user, room) => {
        socket.to(room).emit('remove-member', user)
    })
    socket.on('leave', (room) => {
        socket.leave(room)
    })
    socket.on('disconnect', (user) => {
    })
    socket.on('send-message', (user, message, room) => {
        socket.to(room).emit('receive-message', user, message)
    })
    socket.on('send-private-message', (user, message, recipient) => {
        socket.to(recipient).emit('receive-private-message', user, message)
    })
})

server.listen(PORT, async () => {
    try {
        // await connectDB(process.env.MONGO_URI)
        console.log(`Server listen on port ${PORT}...`)
    } catch (error) {
        console.log(error)
    }
})
