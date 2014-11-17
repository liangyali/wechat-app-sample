/**
 * wechat callbakc
 */

var passport = require('passport');

module.exports = function (router) {

    /**
     * 微信认证
     */
    router.get('/', passport.authenticate('wechat'));

    /**
     * 微信回调处理
     */
    router.get('/callback', passport.authenticate('wechat', {
        failureRedirect: '/auth/err',
        successRedirect: '/auth/success'}));
};
