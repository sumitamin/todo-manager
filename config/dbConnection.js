
// Configuring the database
const mongoose = require('mongoose');
const globalConfig = require("./config");

mongoose.connect(globalConfig.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
