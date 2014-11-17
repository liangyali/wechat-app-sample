var auth = require('./passport');

module.exports = function spec(app) {

    return {
        onconfig: function (config, next) {

            auth.config(config, app);
            next(null, config);
        }
    };
};
