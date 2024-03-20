import axios from 'axios';

const sendSms = async (message, toNumber) => {
  const  accountSid= 'ACed4bdf952a823ab5970cbc922c0cea72'
const    authToken='cacd53a257d8d2d8dbe48b18fd2c8bcd'
const   twilioPhoneNumber='+15344447273'

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const data = new URLSearchParams();
  data.append('To', toNumber);
  data.append('From', twilioPhoneNumber);
  data.append('Body', message);

  try {
    const response = await axios.post(url, data, {
      auth: {
        username: accountSid,
        password: authToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export default sendSms;
