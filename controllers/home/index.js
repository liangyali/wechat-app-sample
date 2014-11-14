'use strict';


var HomeModel = require('../../models/home');


module.exports = function (router) {

    var model = new HomeModel();


    router.get('/', function (req, res) {
        
        res.render('home/index', model);
        
    });

};
