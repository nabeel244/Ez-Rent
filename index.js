const express = require("express")
require('dotenv').config()
const bodyParser = require('body-parser')
const userRoutes = require('./routes/UserRoutes')
const authRoutes = require('./routes/AuthRoutes')
const categoryRoutes = require('./routes/CategoryRoutes')
const productRoutes = require('./routes/ProductRoutes')
const wishlistRoutes = require('./routes/WishlistRoutes')
const pageRoutes = require('./routes/PageRoutes')
const errorHandler = require('./middlewares/ErrorHandlerMiddleware')
const passport = require('./utils/PassportStrategy')
const session = require('express-session');
const cors = require('cors')
const setupDatabaseRelations = require('./models/Relations');
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
setupDatabaseRelations();
app.use(passport.initialize());
app.use(passport.session());
 sequelize.sync({ alter: true }).then(() => { // when you update your db , add or update you migration then you uncomment these
    console.log('Database & tables created!');
}).catch(error => {
    console.log('Table sync failed', error.message)
})
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/pages', pageRoutes)
app.use(errorHandler)

app.listen(process.env.PORT || 3001, () => {
    console.log(`PORT is running at http://localhost:${process.env.PORT}`);
});