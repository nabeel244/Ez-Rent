// services/PageService.js


const PageService = {
    async createPage(req) {
   console.log(req.body);
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
