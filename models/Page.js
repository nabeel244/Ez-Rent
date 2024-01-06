// Assuming sequelize instance is correctly set up and imported in your application
module.exports = (sequelize, DataTypes) => {
    const Page = sequelize.define('Page', {
        pageName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    return Page;
};