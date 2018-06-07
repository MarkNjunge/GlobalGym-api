//@ts-check
const router = require("express").Router();

router.use("*", (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

router.get("/", (req, res) => {
  res.send("Connected to api");
});

module.exports = router;
