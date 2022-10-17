let rooms = []

const addRoom = (newRoom) => {
    rooms.push(newRoom)
}

const removeRoom = (room) => {
    rooms = rooms.filter(item => item.name !== room.name)
}

const updateRoom = (room) => {
    rooms.forEach((item, index) => {
        if (item.name === room.name) {
            rooms[index] = room
        }
    })
}

const checkRoom = (Room) => {
    const room = rooms.find(item => item.name === Room.name)
    return room 
}

const findRoom = (key) => {
    const listRoom = rooms.filter(item => item.name.toLowerCase().includes(key))
    return listRoom
}

const getAllRooms = () => {
    return [...rooms]
}

const joinRoom = (user, room) => {
    const searchedRoom = rooms.find(item => item.name === room.name)
    if(Number(searchedRoom.members.length )!== Number(searchedRoom.limit)) {
        searchedRoom.members.push(user)
        return searchedRoom
    }
    return null
}

const leaveRoom = (user, room) => {
    const searchedRoom = rooms.find(item => item.name === room.name)
    if (searchedRoom.members.length === 1) {
        removeRoom(searchedRoom)
        return searchedRoom
    }
    searchedRoom.members = searchedRoom.members.filter(item => item.username !== user.username)
    return searchedRoom
}

module.exports = {
    addRoom,
    removeRoom,
    checkRoom,
    updateRoom,
    getAllRooms,
    joinRoom,
    leaveRoom,
    findRoom
}

