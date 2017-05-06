const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message', () => {
        let from = 'Jen';
        let text = 'Some Message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location', () => {
        const from = 'Jen';
        const latitude = 567;
        const longitude = 123;
        const url = 'https://www.google.com/maps?q=567,123';
        const message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
        
    });
});