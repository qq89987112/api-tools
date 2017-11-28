let
    api = require('./api-gen'),
    page = require('./page-gen'),
    testApi = require('./test-api'),
    apiCache = require('./api-cache');

    module.exports = [
        api,
        page,
        testApi,
        apiCache
    ]