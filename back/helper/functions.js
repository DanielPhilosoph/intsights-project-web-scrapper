const { getStrongW2iseInfo } = require("./stronger_w2ise");
async function sendStrongW2iseInfo(socket) {
  try {
    const data = await getStrongW2iseInfo();
    socket.emit("strongW2ise", { data });
  } catch (error) {
    console.log(error);
    socket.emit("strongW2ise", { error: "Could not fetch data" });
  }
}

module.exports = { sendStrongW2iseInfo };
