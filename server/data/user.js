let users = []

const addUser = (newUser) => {
    users.push(newUser)
}

const removeUser = (user) => {
    users = users.filter(item=>item.username !== user.username )
}

const updateUser = (user)=>{
    users.forEach((item,index)=>{
        if(item.username === user.username){
            users[index] = user
        }
    })
}

const checkUser = (newUser)=>{
    const user = users.find(item => item.username === newUser.username)
    return user?true:false
}

const findUser = (newUser)=>{
    try {
        const user = users.find(item => item.username === newUser.username)
        return user   
    } catch (error) {
        return null   
    }
}

module.exports = {
    addUser,
    removeUser,
    checkUser,
    updateUser,
    findUser
}