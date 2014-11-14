'use strict';


module.exports = function (router) {

    router.get('/', function (req, res) {

        res.render('home/index', {});

    });

    /**
     * test post data and csrf
     */
    router.post('/create', function (req, res) {
        res.send('ok');
    });

};
