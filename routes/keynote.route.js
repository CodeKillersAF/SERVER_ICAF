const express = require("express");
const router = express.Router();
const controller = require("../controllers/keynoteController");

const KeynoteAPI = ()=>{
    router.post("/add-keynote" , controller.addKeynote);
    router.get("/get-keynotes" , controller.getAllKeynotes);
    router.put("/update-keynote/:id",controller.updateKeynote);
    router.delete("/delete-keynote/:id",controller.deleteKeynote);

    return router;
}

module.exports = KeynoteAPI;