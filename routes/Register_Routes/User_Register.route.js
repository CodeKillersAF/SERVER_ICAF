const router = require('express').Router();

const { userRegister } = require('../../controllers/Auth.controller');

//editor registration route
router.post('/register-editor', async(req, res) => {
    await userRegister(req.body, "editor", res);
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