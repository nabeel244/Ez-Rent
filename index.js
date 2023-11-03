const express = require("express");
require('dotenv').config()
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
const authRoutes = require('./routes/AuthRoutes');
const app = express();
const sequelize = require('./database');

app.use(express.json());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log(`PORT is running at http://localhost:${process.env.PORT}`);
});