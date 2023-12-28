const getUrl = (req) => {
    const origin = req.headers.origin;
    return origin;
}

module.exports = {
    getUrl,
};