module.exports = (sequelize, Sequelize) => {
    const Quest = sequelize.define("questResolt", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        timeDone: {
            type: Sequelize.BOOLEAN
        },
        timeNeed: {
            type: Sequelize.INTEGER
        }
    });
    return Quest;
  };