const router = require('express').Router();

const { userLogin } = require('../../controllers/Auth.controller');

//editor login route
router.post('/login-user', async(req, res) => {
    await userLogin(req.body , res);
});


module.exports = router;