const express = require("express");
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.listen(process.env.PORT || 3000, () => {
  console.log(`PORT is running at http://localhost:${process.env.PORT}`);
});