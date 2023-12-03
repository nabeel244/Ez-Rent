const Nexmo = require('nexmo');

const sendSmsService = new Nexmo({
  apiKey: process.env.NEXMO_ACCOUNT_ID,
  apiSecret: process.env.NEXMO_SECRET_ID
});

export default sendSmsService