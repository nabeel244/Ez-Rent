const express = require("express")
require('dotenv').config()
const bodyParser = require('body-parser')
const userRoutes = require('./routes/UserRoutes')
const authRoutes = require('./routes/AuthRoutes')
const categoryRoutes = require('./routes/CategoryRoutes')
const productRoutes = require('./routes/ProductRoutes')
const errorHandler = require('./middlewares/ErrorHandlerMiddleware')
const passport = require('./utils/PassportStrategy')
const session = require('express-session');
const cors = require('cors')


const app = express();
const sequelize = require('./database');
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(session({
    secret: 'newsercretkey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// sequelize.sync({ alter: true }).then(() => { // when you update your db , add or update you migration then you uncomment these
//     console.log('Database & tables created!');
// });
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use(errorHandler)

app.listen(process.env.PORT || 3001, () => {
    console.log(`PORT is running at http://localhost:${process.env.PORT}`);
});