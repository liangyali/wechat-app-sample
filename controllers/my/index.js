/**
 * 用户信息
 */

module.exports = function (router) {
    router.get('/profile', function (req, res) {
        res.json(req.user);
    });
};
