// services/PageService.js
const Page = require('../models/Page')

const PageService = {
    async createUpdatePage(req) {
        const { page_type, page_name, content } = req.body;

        const [rowCount] = await Page.update(
            { page_name: page_name, content: content },
            {
                where: {
                    page_type: page_type
                },
            }
        );

        if (rowCount > 0) {
            const updatedPage = await Page.findOne({
                where: {
                    page_type: page_type
                }
            });
            return updatedPage.dataValues
        } else {
            return await Page.create({
                page_type: page_type,
                page_name: page_name,
                content: content
            });

        }
    },

    async getPage(pageName) {
        try {
            const page = pages.find(p => p.pageName === pageName);
            return page;
        } catch (error) {
            throw error;
        }
    },

};

module.exports = PageService;
