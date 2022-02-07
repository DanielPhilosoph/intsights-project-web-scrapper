require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

//* ------ Imports ------
const { sendStrongW2iseInfo } = require("./helper/functions");
const { REFRESH_TIME_MS, PORT } = require("./config/config");
const env = process.env.NODE_ENV || "production";
const MONGO_URI =
  env === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
const APP_PORT = PORT || process.env.PORT || 8080;
//* ---------------------

console.log(MONGO_URI);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`connected to MongoDB - ${env}`);

    const app = express();
    const server = app.listen(APP_PORT, () =>
      console.log(`app listening at http://localhost:${APP_PORT}`)
    );

    const io = require("socket.io")(server, { cors: { origin: "*" } });

    io.on("connect", async (socket) => {
      console.log(`Socket connection id: ${socket.id}`);
      await sendStrongW2iseInfo(socket);
      setInterval(async () => {
        await sendStrongW2iseInfo(socket);
      }, REFRESH_TIME_MS);
    });
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
