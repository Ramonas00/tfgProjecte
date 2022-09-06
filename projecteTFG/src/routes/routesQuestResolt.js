module.exports = app => {
    const resolts = require("../controllers/questResolts.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", resolts.create);
    // Retrieve all Tutorials
    router.get("/", resolts.findAll);
    router.get("/onTime", resolts.findAllOnTime);
    router.get("/group/", resolts.findAllGroupOnly);
    router.get("/group/:id", resolts.findAllGroup);
    router.get("/avgTime", resolts.timeNeedAvg);
    // Retrieve all published Tutorials
    //router.get("/answered/:codiId", resolts.findAllAnswered);
    // Retrieve a single Tutorial with id
    router.get("/:id", resolts.findOne);
    // Update a Tutorial with id
    router.put("/:id", resolts.update);
    // Delete a Tutorial with id
    router.delete("/:id", resolts.delete);
    // Delete all Tutorials
    router.delete("/", resolts.deleteAll);
    app.use('/questResolts', router);
  };