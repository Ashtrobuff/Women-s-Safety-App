const Twilio = require('twilio');

// Your Twilio credentials
const accountSid = 'ACed4bdf952a823ab5970cbc922c0cea72';
const authToken = 'cacd53a257d8d2d8dbe48b18fd2c8bcd';

// Initialize Twilio client
const client = new Twilio(accountSid, authToken);

// Sending a message
client.messages
  .create({
    body: 'Hello from Node.js!',
    from: '+15344447273',// Replace with your Twilio number
    to: '+919372584027' ,  // Replace with the recipient's phone number
  })
  .then(message => console.log(message.sid))
  .catch(error => console.log(error));
