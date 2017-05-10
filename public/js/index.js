const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    console.log(message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $(`#messages`).append(li);
});

socket.on('newLocationMessage', function (location){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a.>')

    li.text(`${location.from}: `);
    a.attr('href', location.url);

    li.append(a);

    $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();

    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, () => {
        messageTextbox.val('');
    });
});

const locationButton = $('#send-location')

locationButton.on('click', (e) => {
    if(!navigator.geolocation) {
        return alert('Geolocation not support by your browser.');
    }

    locationButton.attr('disabled', 'disabled')
                    .text('Sending location')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled')
                        .text('Send location')
    }, () => {
        locationButton.removeAttr('disabled')
                        .text('Send location')
        alert('Unable to fetch location');
    });

});