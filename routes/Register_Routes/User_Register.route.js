const router = require('express').Router();

const { userRegister } = require('../../controllers/Auth.controller');

//editor registration route
router.post('/register-user', async(req, res) => {
    await userRegister(req.body, res);
});

//admin registration route
router.post('/register-admin', async(req, res) => {
    await userRegister(req.body, "admin", res);
});

//reviewer registration route
router.post('/register-reviewer', async(req, res) => {
    await userRegister(req.body, "reviewer", res);
});

module.exports = router;