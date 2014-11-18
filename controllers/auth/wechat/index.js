/**
 * wechat callbakc
 */

var passport = require('passport');

module.exports = function (router) {


    router.get('/', passport.authenticate('wechat'));

    router.get('/callback', passport.authenticate('wechat', {
        failureRedirect: '/auth/err',
        successRedirect: '/auth/wechat/success'
    }), function (req, res) {
        res.json(req.user);
    });

    router.get('/success', function (req, res) {
        res.json({user: req._passport});
    });
};
