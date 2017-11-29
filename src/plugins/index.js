let
    koa = require('./koa-gen'),
    api = require('./api-gen'),
    page = require('./vue-gen'),
    testApi = require('./test-api'),
    apiCache = require('./api-cache');

    module.exports = [
        koa,
        api,
        page,
        testApi,
        apiCache
    ]