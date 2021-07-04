const router = require('express').Router();

const { userRegister } = require('../../controllers/Auth.controller');

//editor registration route
router.post('/register-user', async(req, res) => {
    await userRegister(req.body, res);
});

module.exports = router;