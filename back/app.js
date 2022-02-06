const express = require("express");
const { getInfo } = require("./helper/stronger_w2ise");

const { sendStrongW2iseInfo } = require("./helper/functions");

const app = express();

// app.get("/strongerW2ise", async (req, res) => {
//   // console.log("Im here");
//   // try {
//   //   return res.json({ data: await getInfo() });
//   // } catch (error) {
//   //   return res.status(400).json({ error: "Could not fetch data" });
//   // }
// });

const server = app.listen(3004, () => {
  console.log("listening on port 3004");
});
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connect", async (socket) => {
  console.log(`Socket connection id: ${socket.id}`);
  await sendStrongW2iseInfo(socket);
  setInterval(async () => {
    await sendStrongW2iseInfo(socket);
  }, 10000);
});
