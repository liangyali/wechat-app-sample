var passport = require('./passport');

module.exports = function spec(app) {

    app.on('middleware:after:session', function configPassport(eventargs) {
        passport.config(app);
    });

    return {
        onconfig: function (config, next) {

            next(null, config);
        }
    };
};
