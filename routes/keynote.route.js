const express = require("express");
const router = express.Router();
const controller = require("../controllers/keynoteController");

const KeynoteAPI = ()=>{
    router.post("/add-keynote" , controller.addKeynote);
    router.get("/get-keynotes" , controller.getAllKeynotes);
    router.get("/get-approved-keynotes" , controller.getApprovedKeynotes);
    router.get("/get-pending-keynotes" , controller.getPendingKeynotes);
    router.put("/update-keynote/:id",controller.updateKeynote);
    router.delete("/delete-keynote/:id",controller.deleteKeynote);
    router.get("/get-keynotes/:id",controller.getKeynoteByID);

    return router;
}

module.exports = KeynoteAPI;