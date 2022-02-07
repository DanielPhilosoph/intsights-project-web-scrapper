const express = require("express");
const { model } = require("mongoose");

const { sendStrongW2iseInfo } = require("./helper/functions");
const { REFRESH_TIME_MS } = require("./config/config");

const strongW2iseRouter = require("./routes/strongW2ise");

const app = express();

//* Update database process
async function updatingDatabase() {
  await sendStrongW2iseInfo(socket);
  setInterval(async () => {
    await sendStrongW2iseInfo(socket);
  }, REFRESH_TIME_MS);
}
updatingDatabase();

//* Routers
app.use("/strongW2ise", strongW2iseRouter);

module.exports = app;
