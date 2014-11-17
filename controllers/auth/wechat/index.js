/**
 * wechat callbakc
 */

var passport = require('passport');

module.exports = function (router) {


    router.get('/', passport.authenticate('wechat'));

    router.post('/callback', function (req, res) {
        passport.authenticate('wechat', {
            failureRedirect: '/auth/err',
            successRedirect: req.session.goingTo || '/profile'});
    });
};
