const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'lola@example.com',
        text: 'Hey. This is Stephen.'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newEmail', (email) => {
    console.log('New Email', email);
});