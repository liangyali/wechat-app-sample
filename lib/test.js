/**
 * Created by liangyali on 14-12-1.
 */

module.exports = function (config) {
    config = config || {};

    console.log('ok');

    return function (req, res, next) {
        //console.log(config.config);
        console.log('ok');
        next();
    };
}
