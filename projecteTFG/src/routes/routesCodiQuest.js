module.exports = app => {
    const codiQuest = require("../controllers/codiQuest.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", codiQuest.create);
    // Retrieve all Tutorials
    router.get("/", codiQuest.findAll);
    // Retrieve all published Tutorials
    router.get("/codis/:questId", codiQuest.findAllCodisByQuest);
    // Retrieve a single Tutorial with id
    router.get("/:id", codiQuest.findOne);
    // Update a Tutorial with id
    router.put("/:id", codiQuest.update);
    // Delete a Tutorial with id
    router.delete("/byQuest/:id", codiQuest.deleteByQuest);
    router.delete("/:id", codiQuest.delete);
    // Delete all Tutorials
    router.delete("/", codiQuest.deleteAll);
    app.use('/codiQuest', router);
  };