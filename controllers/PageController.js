// controllers/PageController.js
const PageService = require('../services/PageService');
const HttpStatus = require('../utils/ResponseStatus')


const PageController = {
    async createPage(req, res) {
        try {
            const pageData = req.body;
            const page = await PageService.createPage(pageData);
            res.status(201).json(page);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getPage(req, res) {
        try {
            const pageName = req.params.pageName;
            const page = await PageService.getPage(pageName);
            if (!page) {
                return res.status(404).send('Page not found.');
            }
            res.json(page);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Add other methods like updatePage, deletePage, allPages, etc.
};

module.exports = PageController;