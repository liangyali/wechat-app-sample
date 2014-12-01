'use strict';


var LoginModel = require('../../models/login');
var passport = require('passport');


module.exports = function (router) {

    var model = new LoginModel();


    router.get('/', function (req, res) {

        res.render('login/index', model);

    });

    router.post('/', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/home');
            });
        })(req, res, next);
    });

};
