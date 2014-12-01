var passport = require('passport');
var WechatStrategy = require('passport-wechat').Strategy;
var LocalStrategy = require('passport-local').Strategy;

/**
 * 配置passport
 * @param config
 */
exports.config = function (app) {

    passport.use(new WechatStrategy({
        "appid": "wx1903fcbc53deafe0",
        "state": true,
        "scope": "snsapi_userinfo",
        "appsecret": "c7aa389c8a0f9adb8ba50b89c3f77636",
        "callbackURL": "http://liangyali.duapp.com/auth/wechat/callback"
    }, function (openid, profile, token, done) {

        //TODO:wechat get userInfo
        console.log("openid:" + openid);
        console.log("profile:" + JSON.stringify(profile));
        return done(null, {openid: openid, profile: profile});
    }));

    // 配置本地登陆
    passport.use(new LocalStrategy(function (username, password, done) {
        done(null, {name: "liangyali"});
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

        //access mapls


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
            'user': {
                '/home': false,
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