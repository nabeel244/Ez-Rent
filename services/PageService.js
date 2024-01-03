// services/PageService.js
const { Page } = require('../models/Page'); // Import the Sequelize model

const PageService = {
    async createPage(pageData) {
        return await Page.create(pageData);
    },

    async getPage(pageName) {
        return await Page.findOne({ where: { pageName } });
    },

    // Implement other methods like updatePage, deletePage, allPages, etc.
};

module.exports = PageService;