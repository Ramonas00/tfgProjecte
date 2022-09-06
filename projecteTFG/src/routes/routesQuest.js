  module.exports = app => {
    const quest = require("../controllers/questionari.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", quest.create);
    // Retrieve all Tutorials
    router.get("/", quest.findAll);
    // Retrieve all published Tutorials
    //router.get("/answered/:codiId", quest.findAllAnswered);
    // Retrieve a single Tutorial with id
    router.get("/:id", quest.findOne);
    // Update a Tutorial with id
    router.put("/:id", quest.update);
    // Delete a Tutorial with id
    router.delete("/:id", quest.delete);
    // Delete all Tutorials
    router.delete("/", quest.deleteAll);
    app.use('/quest', router);
  };