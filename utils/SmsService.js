// const Nexmo = require('nexmo');
// const { Vonage } = require('@vonage/server-sdk');

// const sendSmsService = new Vonage({
//   apiKey: process.env.NEXMO_ACCOUNT_ID,
//   apiSecret: process.env.NEXMO_SECRET_ID
// }, { debug: true });

// async function sendSms(to, text) {
//   const from = process.env.VONAGE_VIRTUAL_NUMBER;
//   try {
//     const resp = await sendSmsService.sms.send({ to, from, text });
//     console.log('Message sent successfully');
//     return resp
//   } catch (err) {
//     console.error('There was an error sending the messages.');
//     console.error(err);
//     // Throw the error so it can be caught by the caller
//     throw err;
//   }
// }

// module.exports = sendSms


const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;   

const client = new twilio(accountSid, authToken);

async function sendSms(to, text) {
  const from = process.env.TWILIO_VIRTUAL_NUMBER;
  try {
    await client.messages.create({
      body: text,
      to: to, 
      from: from
    });
    console.log('Message sent');
  } catch (err) {
    console.error('There was an error sending the message.');
    console.error(err.messages);
   
  }
}

module.exports = sendSms;