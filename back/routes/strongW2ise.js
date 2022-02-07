const express = require("express");

const { getPostByType } = require("../mongo/functions/queries");

const router = express.Router();

/**
 *? --- Router ---
 ** /strongW2ise route
 */

router.get("/", (req, res) => {
  try {
    const data = await getPostByType("strongW2ise");
    return res.json({ data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Could not get data" });
  }
});

module.exports = router;
