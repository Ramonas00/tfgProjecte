const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Si pots llegir aquest missatge, la petició s'ha rebut correctament." });
});

require("./src/routes/routes")(app);
require("./src/routes/routesResolt")(app);
require("./src/routes/routesQuest")(app);
require("./src/routes/routesCodiQuest")(app);
require("./src/routes/routesResoltQResolt")(app);
require("./src/routes/routesQuestResolt")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./src/models");
db.sequelize.sync();