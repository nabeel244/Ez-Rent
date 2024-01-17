// services/UserService.js
const { Sequelize } = require('sequelize');
const User = require('../models/User');

const getAllUsers = async () => {
    return await User.findAll({
        where: {
            role: {
                [Sequelize.Op.notIn]: ['admin']
            }
        }
    });
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const updateUser = async (userData) => {
    const { status, comment, id } = userData
    const [affectedRows] = await User.update({ status, comment }, {
        where: { id: id },
    });

    if (affectedRows > 0) {
        const updatedUser = await User.findOne({
            where: { id: id },
        });

        return updatedUser;
    }
};

const deleteUser = async (id) => {
    return await User.destroy({
        where: { id: id }
    });
};

const getUserById = async (id) => {
    return await User.findByPk(id);
};

const searchUser = async (req) => {
    const { search, type } = req.body;
    const validSearchFields = ['name', 'email', 'phone'];
    if (!validSearchFields.includes(type)) {
        throw new Error('Invalid search type');
    }

    // Construct the dynamic query based on the specified type
    const whereClause = {
        [type]: {
            [Sequelize.Op.like]: `%${search}%`,
        },
        role: {
            [Sequelize.Op.not]: 'admin',
        },
    };

    const users = await User.findAll({
        where: whereClause,
    });

    return users;
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    searchUser
};