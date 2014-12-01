/**
 * wechat redirect and callback
 */

var passport = require('passport');

module.exports = function (router) {

    router.get('/', passport.authenticate('wechat'));

    router.get('/callback', passport.authenticate('wechat', {
        failureRedirect: '/auth/error',
        successRedirect: '/auth/success'
    }));
};
