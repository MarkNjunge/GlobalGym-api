//@ts-check
require("dotenv").config();

function dbConfig() {
  if (process.env.DB_URL) {
    return process.env.DB_URL;
  } else {
    return (
      "mongodb://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASSWORD +
      "@" +
      process.env.DB_HOST +
      ":" +
      process.env.DB_PORT +
      "/" +
      process.env.DB_NAME
    );
  }
}

module.exports = {
  port: process.env.PORT || 3000,
  db: dbConfig()
};
