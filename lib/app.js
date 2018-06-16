//@ts-check
const bodyParser = require("body-parser");
const express = require("express");
const aglio = require("aglio");
const fs = require("fs");

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

app.get("/docs", (req, res) => {
  const blueprint = fs.readFileSync("./docs/api.yml").toString();

  const options = {
    themeVariables: "default"
  };

  aglio.render(blueprint, options, function(err, html) {
    if (err) {
      console.log(err);
      res.send(404);
      return;
    }

    res.send(html);
  });
});

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
