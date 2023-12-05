// const Nexmo = require('nexmo');
const { Vonage } = require('@vonage/server-sdk');

const sendSmsService = new Vonage({
  apiKey: process.env.NEXMO_ACCOUNT_ID,
  apiSecret: process.env.NEXMO_SECRET_ID
}, { debug: true });

async function sendSms(to, text) {
  const from = process.env.VONAGE_VIRTUAL_NUMBER;
  try {
    const resp = await sendSmsService.sms.send({ to, from, text });
    console.log('Message sent successfully');
    return resp
  } catch (err) {
    console.error('There was an error sending the messages.');
    console.error(err);
    // Throw the error so it can be caught by the caller
    throw err;
  }
}

module.exports = sendSms