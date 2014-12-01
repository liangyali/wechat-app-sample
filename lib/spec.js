var passport = require('./passport');

module.exports = function spec(app) {

    /**
     * 中间件加载完成，进行passport的配置
     */
    app.on('middleware:after', function (config) {
        passport.config(app);
    });

    return {
        onconfig: function (config, next) {
            next(null, config);
        }
    };
};
