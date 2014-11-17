/**
 * wechat callbakc
 */

var passport = require('passport');

module.exports = function (router) {


    router.get('/', passport.authenticate('wechat'));

    router.get('/callback', function (req, res) {
        passport.authenticate('wechat', {
            failureRedirect: '/auth/err'}, function (req, res) {
            res.redirect('/home');
        });
    });
};
