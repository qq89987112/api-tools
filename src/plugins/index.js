let
    api = require('./api-gen'),
    page = require('./page-gen'),
    testApi = require('./test-api');

    module.exports = [
        api,
        page,
        testApi
    ]