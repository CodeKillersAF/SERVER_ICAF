const express = require('express');
const router = express.Router();

const userController = require('../../controllers/Edit_User/edit_user');

module.exports = function() {
    router.delete('/delete/:id' , userController.deleteUser);
    router.get('/finduser/:id' , userController.findUser);
    router.put('/update/:id' , userController.updateUserDetails);
    router.put('/update/role/:id' , userController.updateRole);
    return router;
}