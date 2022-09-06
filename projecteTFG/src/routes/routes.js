module.exports = app => {
    const exercici = require("../controllers/exercici.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", exercici.create);
    // Retrieve all Tutorials
    router.get("/", exercici.findAll);
    router.get("/inResolts", exercici.findAllInResolts);
    // Retrieve all published Tutorials
    router.post("/quest", exercici.addTutorial);
    router.post("/relation", exercici.addRelation);
    router.get("/quest/:id", exercici.getExercicisByQuest);
    // Retrieve a single Tutorial with id
    router.get("/:id", exercici.findOne);
    // Update a Tutorial with id
    router.put("/:id", exercici.update);
    // Delete a Tutorial with id
    router.delete("/:id", exercici.delete);
    // Delete all Tutorials
    router.delete("/", exercici.deleteAll);
    app.use('/codis', router);
  };