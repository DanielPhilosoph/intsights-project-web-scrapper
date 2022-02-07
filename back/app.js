const express = require("express");

const { updatedDatabaseStrongW2ise } = require("./helper/functions");
const { REFRESH_TIME_MS } = require("./config/config");

const strongW2iseRouter = require("./routes/strongW2ise");

const app = express();

//* Update database process
async function updatingDatabase() {
  await updatedDatabaseStrongW2ise();
  setInterval(async () => {
    await updatedDatabaseStrongW2ise();
  }, REFRESH_TIME_MS);
}
updatingDatabase();

//* Routers
app.use("/strongW2ise", strongW2iseRouter);

module.exports = app;
