module.exports = app => {
    const exercici = require("../controllers/exercici.controller.js");
    var router = require("express").Router();
    router.post("/", exercici.create);
    router.get("/", exercici.findAll);
    router.get("/inResolts", exercici.findAllInResolts);
    router.post("/quest", exercici.addTutorial);
    router.post("/relation", exercici.addRelation);
    router.get("/quest/:id", exercici.getExercicisByQuest);
    router.get("/:id", exercici.findOne);
    router.put("/:id", exercici.update);
    router.delete("/:id", exercici.delete);
    router.delete("/", exercici.deleteAll);
    app.use('/codis', router);
  };