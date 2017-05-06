const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createMessage', {
        to: 'lola',
        text: 'Hey. This is Stephen.'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    console.log(`${message.from}: ${message.text} || ${message.createdAt}`);
});