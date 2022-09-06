const db = require("../models");
const Tutorial = db.codi;
const Quest = db.quest;
const Resolt = db.resolt;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    codes: req.body.codes,
    dificulty: req.body.dificulty,
    description: req.body.description,
    outputCode: req.body.outputCode,
  };
  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Tutorial.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

exports.findAllInResolts = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Tutorial.findAll({ include: [
    {
      model: db.resolt,

    }], where: { resolt: { [Op.ne]: null } } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

// Find a single Tutorial with an id
exports.findByTitle = (req, res) => {
  const title = req.params.title;
  Tutorial.findByPk
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Resolt.destroy({ where: { codiId: id }})
    Tutorial.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });
};
// Find all published Tutorials
exports.addTutorial = (req, res) => {
    // Create a Tutorial

    const tutorial = {
      title: req.body.title,
      codes: req.body.codes,
      dificulty: req.body.dificulty,
      description: req.body.description,
      outputCode: req.body.outputCode,
    };

    const variables = {
      questionari_id: req.body.questionari_id,
    };
    
    
    return Tutorial.create(tutorial)
    .then(codi => {
      if (!codi) {
        console.log("Codi not found!" +codi.id);
        return null;
      }
      return Quest.findByPk(variables.questionari_id).then((quest) => {
        if (!quest) {
          console.log("Questionari not found!");
          return null;
        }
        codi.addQuestionari(quest);
        
        console.log(`>> added Tutorial id=${quest.id} to Tag id=${codi.id}`);
        return codi;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });

};


exports.addRelation = (req, res) => {
  // Create a Tutorial

  const tutorial = req.body.exercici;

  const variables = {
    questionari_id: req.body.questionari_id,
  };
  
  
  return Tutorial.findByPk(tutorial.id)
  .then(codi => {
    if (!codi) {
      console.log("Codi not found!" +codi.id);
      return null;
    }
    return Quest.findByPk(variables.questionari_id).then((quest) => {
      if (!quest) {
        console.log("Questionari not found!");
        return null;
      }
      codi.addQuestionari(quest);
      
      console.log(`>> added Tutorial id=${quest.id} to Tag id=${codi.id}`);
      return codi;
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Tutorial to Tag: ", err);
  });

};



exports.getExercicisByQuest = (req, res) => {
  // Create a Tutorial

  const questId = req.params.id;

  return Quest.findOne({ where: { id: questId }, include: Tutorial });

};