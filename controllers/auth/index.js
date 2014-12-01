/**
 * Created by liangyali on 14-12-1.
 */

module.exports = function (router) {

    /**
     * 用户授权成功后的处理页面
     */
    router.get('/success', function (req, res) {
        res.json(req.user);
    });

    /**
     * 用户授权失败页面
     */
    router.get('/error', function (req, res) {
        res.json({status: false, message: 'auth fail!'});
    });
};
