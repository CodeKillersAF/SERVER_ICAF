const express = require('express');
const router = express.Router();
const WorkShopConductorController = require('../controllers/workShopConductorController');


const WorkShopConductorAPI = () => {
    router.post('/add-workshopconductor', WorkShopConductorController.addWorkShopConductor);
    router.get('/get-all-approved-work-shop-conductors', WorkShopConductorController.getAllWorkShopConductoresApproved);
    return router;
}

module.exports = WorkShopConductorAPI;