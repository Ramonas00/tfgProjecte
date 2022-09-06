module.exports = (sequelize, Sequelize) => {
    const Resolt = sequelize.define("resolt", {
      codeAnswer: {
        type: Sequelize.TEXT
      },
      outputAnswer: {
        type: Sequelize.STRING
      },
      timeDone: {
        type: Sequelize.BOOLEAN
      },
      timeNeed: {
        type: Sequelize.INTEGER
      }
    });
    return Resolt;
  };