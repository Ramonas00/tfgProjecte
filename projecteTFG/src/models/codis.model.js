module.exports = (sequelize, Sequelize) => {
    const Codis = sequelize.define("codi", {
      title: {
        type: Sequelize.STRING
      },
      codes: {
        type: Sequelize.TEXT
      },
      dificulty: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      outputCode: {
        type: Sequelize.STRING
      }
    });
    return Codis;
  };