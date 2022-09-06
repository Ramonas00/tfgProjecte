module.exports = (sequelize, Sequelize) => {
    const Quest = sequelize.define("questionari", {
      title: {
        type: Sequelize.STRING
      },
    });
    return Quest;
  };