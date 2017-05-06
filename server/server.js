const path = require('path');
const http = require('http')

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    newUserEntered(socket);
    newMessage(socket);
    createLocationMessage(socket);
    
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

});

const newMessage = (socket) => {
    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        callback('This is from the server');
    });
}

const createLocationMessage = (socket) => {
  socket.on('createLocationMessage', (coords) => {
    io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`))
  });
}

const newUserEntered = (socket) => {
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));
}

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});