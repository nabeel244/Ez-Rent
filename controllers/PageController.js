// controllers/PageController.js
const PageService = require('../services/PageService');
const HttpStatus = require('../utils/ResponseStatus')


const PageController = {
    async createPage(req, res, next) {
        try {
            const pageData = req.body;
            const page = await PageService.createPage(pageData);
            // res.status(201).json(page);
            res.status(HttpStatus.OK).json({ message: "Page created successfully", page });

        } catch (error) {
            // res.status(500).send(error.message);
            next(error)
        }
    },

    async getPage(req, res, next) {
        try {
            const pageName = req.params.pageName;
            const page = await PageService.getPage(pageName);
            if (!page) {
                // return res.status(404).send('Page not found.');
                res.status(HttpStatus.NOT_FOUND).json({ message: "Page not found", page });

            }
            res.json(page);
        } catch (error) {
            // res.status(500).send(error.message);
            next(error)
        }
    },

    // Add other methods like updatePage, deletePage, allPages, etc.
};

module.exports = PageController;