var passport = require('passport');
var WechatStrategy = require('passport-wechat').Strategy;

/**
 * 配置passport
 * @param config
 */
exports.config = function (config, app) {
    var settings = config.get('wechat');

    passport.use(new WechatStrategy(settings, function (openid, profile, token, done) {

        //TODO:wechat get userInfo
        return done(null, {openid: openid, profile: profile});
    }));

    //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    app.use(passport.initialize());
    app.use(passport.session());
};


exports.isAuthenticated = function () {
    return function (req, res, next) {
        //access map

        /**
         * 验证认证的地址列表
         * @type {{/admin: boolean, /profile: boolean}}
         */
        var authMap = {
            '/home': true,
            '/profile': true
        };

        /**
         * 角色访问列表
         * @type {{use: {/admin: boolean}}}
         */
        var blackList = {
            'use': {
                '/home': true,
                '/admin': true
            }
        };

        var route = req.url;
        var role = (req.user && req.user.role) ? req.user.role : '';

        if (!authMap[route]) {
            /**
             * 验证是否对地址有访问权限
             */
            next();
            return;
        } else if (!req.isAuthenticated()) {

            /**
             * 验证用户的是否通过过验证
             * @type {req.url|*}
             */
                //if use is not authorized ,save the locaton
            req.session.goingTo = req.url;
            res.redirect('/auth/wechat');
        } else if (blackList[role] && blackList[role][route] == true) {

            /**
             *
             * @type {{url: (req.url|*)}}
             */
            var model = {url: route};

            res.locals.user = req.user;
            res.status(401);

            res.render('errors/401', model);
        } else {
            next();
        }
    };
};


/**
 * a heler method to add use to the response context so don't have to manual do ti
 * @param req
 * @param res
 * @param next
 * @returns {injectUser}
 */
exports.injectUser = function () {
    return function injectUser(req, res, next) {
        if (req.isAuthenticated()) {
            res.locals.user = req.user;
        }
        next();
    };
};