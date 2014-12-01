var passport = require('./passport');

module.exports = function (app) {

    /**
     * 中间件加载完成，进行passport的配置
     */
    app.on('middleware:after:session', function (eventArgs) {
        passport.config(eventArgs.app);
    });

    return {};
};
