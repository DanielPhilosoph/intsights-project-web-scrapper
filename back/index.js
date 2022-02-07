require("dotenv").config();
const mongoose = require("mongoose");

//* ------ Imports ------
const { PORT } = require("./config/config");
const env = process.env.NODE_ENV || "production";
const MONGO_URI =
  env === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
const APP_PORT = PORT || process.env.PORT || 8080;
//* ---------------------

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`connected to MongoDB - ${env}`);

    app.listen(APP_PORT, () =>
      console.log(`app listening at http://localhost:${APP_PORT}`)
    );
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
