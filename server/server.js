const path = require('path');
const http = require('http')

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newEmail', {
        from: 'steve@example.com',
        text: 'Hey. What is going on',
        createdAt: 123
    });

    socket.on('createEmail', (newEmail) => {
       console.log('createEmail', newEmail);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});