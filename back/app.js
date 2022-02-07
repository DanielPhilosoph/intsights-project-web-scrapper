const express = require("express");

const { sendStrongW2iseInfo } = require("./helper/functions");

const REFRESH_TIME_MS = 120000; //* 2 min

const app = express();

const server = app.listen(3004, () => {
  console.log("listening on port 3004");
});

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connect", async (socket) => {
  console.log(`Socket connection id: ${socket.id}`);
  await sendStrongW2iseInfo(socket);
  setInterval(async () => {
    await sendStrongW2iseInfo(socket);
  }, REFRESH_TIME_MS);
});
