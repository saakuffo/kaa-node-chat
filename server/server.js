const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

// Destructruing
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
const {
    isRealString
} = require('./utils/validation');
const {
    ConnectedUsers
} = require('./utils/connectedUsers')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const connectedUsers = new ConnectedUsers();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    joinRoom(socket);
    newMessage(socket);
    createLocationMessage(socket);

    socket.on('disconnect', () => {
        const leavingUser = connectedUsers.removeUser(socket.id);
        
        if(leavingUser) {
            io.to(leavingUser.room).emit('newMessage', generateMessage('Admin', `${leavingUser.name} has left`));
            io.to(leavingUser.room).emit('updateUserList', connectedUsers.getUserList(leavingUser.room));
        }
    });

});

const newMessage = (socket) => {
    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();
    });
}

const createLocationMessage = (socket) => {
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
}

const newUserEntered = (socket, params) => {
    socket.emit('newMessage', generateMessage('Admin', `Welcome to the chat app ${params.name}!`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));
}

const joinRoom = (socket) => {
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }
        socket.join(params.room)
        updateUserList(socket, params)
        newUserEntered(socket, params);
        callback();
    });
};

const updateUserList = (socket, params) => {
    connectedUsers.removeUser(socket.id)
    connectedUsers.addUser(socket.id, params.name, params.room)
    io.to(params.room).emit('updateUserList', connectedUsers.getUserList(params.room))
};

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});