//@ts-check
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const config = require("./../config");

function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.db).catch(() => {});
    const db = mongoose.connection;

    db.on("error", reason => {
      reject(reason.message);
    });

    db.on("open", () => {
      resolve();
    });

    db.on("disconnected", () => {
      console.log("Disconnected from mongodb");
    });
  });
}

module.exports = {
  connect
};
