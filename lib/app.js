//@ts-check
const bodyParser = require("body-parser");
const express = require("express");

const config = require("./config");
const router = require("./routes");
const database = require("./database");

const PORT = config.port;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(router);

database
  .connect()
  .then(() => {
    app.listen(PORT, error => {
      if (error) {
        console.log(error.message);
      } else {
        console.log(`API running on port ${PORT}`);
      }
    });
  })
  .catch(reason => {
    console.log(reason);
  });
