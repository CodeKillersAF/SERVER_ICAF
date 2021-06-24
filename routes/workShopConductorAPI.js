const express = require('express');
const router = express.Router();
const WorkShopConductorController = require('../controllers/workShopConductorController');

const WorkShopConductorAPI = () => {
    router.post('/add-workshopconductor', WorkShopConductorController.addWorkShopConductor);
    return router;
}

module.exports = WorkShopConductorAPI;