module.exports = app => {
  const resolts = require("../controllers/resolts.controller.js");
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/", resolts.create);
  // Retrieve all Tutorials
  router.get("/", resolts.findAll);
  router.get("/group", resolts.findAllGroup);
  router.get("/onTime", resolts.findAllOnTime);
  router.get("/avgTime", resolts.timeNeedAvg);
  // Retrieve all published Tutorials
  router.get("/answered/:codiId", resolts.findAllAnswered);
  // Retrieve a single Tutorial with id
  router.get("/:id", resolts.findOne);
  // Update a Tutorial with id
  router.put("/:id", resolts.update);
  // Delete a Tutorial with id
  router.delete("/byExercici/:id", resolts.deleteByExercici);
  router.delete("/:id", resolts.delete);
  // Delete all Tutorials
  router.delete("/", resolts.deleteAll);
  app.use('/resolts', router);
};