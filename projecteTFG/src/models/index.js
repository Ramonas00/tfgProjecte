const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.codi = require("./codis.model.js")(sequelize, Sequelize);
db.resolt = require("./resolts.model.js")(sequelize, Sequelize);
db.quest = require("./questionari.model.js")(sequelize, Sequelize);
db.questResolt = require("./questResolts.model.js")(sequelize, Sequelize);
db.codi.hasOne(db.resolt);
db.quest.hasOne(db.questResolt);

const Junction = sequelize.define(
  "codi-questionari",
  {id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }},
  { timestamps: false }
);

db.quest.belongsToMany(db.codi, { through: Junction });
db.codi.belongsToMany(db.quest, { through: Junction });

db.codiQuest = Junction;

const JunctionQR = sequelize.define(
  "questResolts-resolts",
  {id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }},
  { timestamps: false }
);

db.questResolt.belongsToMany(db.resolt, { through: JunctionQR });
db.resolt.belongsToMany(db.questResolt, { through: JunctionQR });

db.resoltQResolt = JunctionQR;

  /*const Junction = sequelize.define("codi-questionari", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    questionariId: {
      type: Sequelize.INTEGER,
    },
    codiId: {
      type: Sequelize.INTEGER,
    },
  });
  Junction.associate = models => {
    Junction.belongsTo(models.db.quest, {
      foreignKey: 'questionariId'
    });
    Junction.belongsTo(models.db.codi, {
      foreignKey: 'codiId'
    });
  }*/



/*db.codi.belongsToMany(db.quest, {
  through: "codi-questionari",
  as: "questionari",
  foreignKey: "codi_id",
})
db.quest.belongsToMany(db.codi, {
  through: "codi-questionari",
  as: "resolt",
  foreignKey: "questionari_id",
})*/
module.exports = db;