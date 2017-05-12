const socket = io();

const scrollToBottom = () => {
    // Selectors
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child');
    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

const generateFormattedTime = (item) => {  
    return moment(item.createdAt).format('h:mm a');
};

socket.on('newMessage', (message) => {
    const formattedTime = generateFormattedTime(message);
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (location){
    const formattedTime = generateFormattedTime(location);
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: location.from,
        createdAt: formattedTime,
        url: location.url
    });

    $('#messages').append(html);
    scrollToBottom();
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