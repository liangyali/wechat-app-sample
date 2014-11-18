'use strict';


module.exports = function (router) {

    router.get('/', function (req, res) {
        req.session['user']='123';
        res.json({user: req.session || ''});
    });

    /**
     * test post data and csrf
     */
    router.post('/create', function (req, res) {
        res.send('ok');
    });

};
