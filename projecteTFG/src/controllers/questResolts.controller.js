const db = require("../models");
const Resolt = db.questResolt;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {

  // Create a Tutorial
  const resolt = {
    questionariId: req.body.questionariId,
    timeDone: req.body.timeDone,
    timeNeed: req.body.timeNeed,
  };
  // Save Tutorial in the database
  Resolt.create(resolt)
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
    const id = req.params.id;
    const title = req.query.id;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Resolt.findAll( )
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

exports.findAllGroup = (req, res) => {
  const id = req.params.id;
  const title = req.query.id;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Resolt.findAll({ where: { questionariId: id } })
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

exports.findAllGroupOnly = (req, res) => {
    const id = req.params.id;
    const title = req.query.id;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Resolt.findAll({ group: "questionariId" })
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

exports.findAllOnTime = (req, res) => {
    const id = req.params.id;
    const title = req.query.id;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Resolt.findAll({ where: { timeDone: 0 }})
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

exports.timeNeedAvg = (req, res) => {
  const id = req.params.id;
  const title = req.query.id;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Resolt.findAll({
    attributes: ['codiId', [db.Sequelize.fn('AVG', db.Sequelize.col('timeNeed')), "totalTimeNeed"]],
    where: { timeDone: 0 },
    group: "codiId"
    })
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

exports.timeNeedAvg = (req, res) => {
    const id = req.params.id;
    const title = req.query.id;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Resolt.findAll({
      attributes: ['questionariId', [db.Sequelize.fn('AVG', db.Sequelize.col('timeNeed')), "totalTimeNeed"]],
      where: { timeDone: 0 },
      group: "questionariId"
      })
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
    Resolt.findByPk(id)
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
  Resolt.findByPk
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
    Resolt.update(req.body, {
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
    Resolt.destroy({
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
    Resolt.destroy({
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
exports.findAllAnswered = (req, res) => {
    //console.log(req.params.codiId);
    const codiId = req.params.codiId;
    Resolt.findAll({ where: { codiId: codiId } })
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