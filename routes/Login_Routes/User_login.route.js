const router = require('express').Router();

const { userLogin } = require('../../controllers/Auth.controller');

//editor login route
router.post('/login-editor', async(req, res) => {
    await userLogin(req.body, "editor", res);
});

//admin login route
router.post('/login-admin', async(req, res) => {
    await userLogin(req.body, "admin", res);
});

//reviewer login route
router.post('/login-reviewer', async(req, res) => {
    await userLogin(req.body, "reviewer", res);
});


module.exports = router;