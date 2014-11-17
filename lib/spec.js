/**
 * 配置启动项
 */
var passport = require('passport');
var auth = require('./auth');

module.exports = function spec(app) {
    app.on('middleware:after:session', function (eventArgs) {

    });

    return {
        onconfig: function (config, next) {

            var wechatConfig = config.get('wechat');
            passport.use(auth.wechatStrategy(wechatConfig));

            //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
            passport.serializeUser(function (user, done) {
                done(null, user);
            });

            passport.deserializeUser(function (obj, done) {
                done(null, obj);
            });
            app.use(passport.initialize());
            app.use(passport.session());
            next(null, config);
        }
    };
};
