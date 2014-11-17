var passport = require('./passport');

module.exports = function spec(app) {

    return {
        onconfig: function (config, next) {
            passport.config(config, app);
            next(null, config);
        }
    };
};
