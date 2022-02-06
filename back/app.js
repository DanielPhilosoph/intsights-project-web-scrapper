const express = require("express");
const { getInfo } = require("./helper/stronger_w2ise");

const app = express();

app.get("/strongerW2ise", async (req, res) => {
  console.log("Im here");
  try {
    return res.json({ data: await getInfo() });
  } catch (error) {
    return res.status(400).json({ error: "Could not fetch data" });
  }
});

app.listen(3004, () => {
  console.log("listening on port 3004");
});

// async function x() {
//   try {
//     request(
//       {
//         url: "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
//         agentClass: Agent,
//         method: "GET",
//         agentOptions: {
//           socksHost: "localhost",
//           socksPort: 9050,
//         },
//       },
//       (err, res) => {
//         console.log(err || res.body);
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }
// x();
