module.exports = app => {
    const resoltQResolt = require("../controllers/resoltQResolt.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", resoltQResolt.create);
    // Retrieve all Tutorials
    router.get("/", resoltQResolt.findAll);
    // Retrieve all published Tutorials
    router.get("/codis/:questId", resoltQResolt.findAllCodisByQuest);
    // Retrieve a single Tutorial with id
    router.get("/:id", resoltQResolt.findOne);
    // Update a Tutorial with id
    router.put("/:id", resoltQResolt.update);
    // Delete a Tutorial with id
    router.delete("/byQuest/:id", resoltQResolt.deleteByQuest);
    router.delete("/:id", resoltQResolt.delete);
    // Delete all Tutorials
    router.delete("/", resoltQResolt.deleteAll);
    app.use('/resoltQResolt', router);
  };