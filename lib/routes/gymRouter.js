//@ts-check
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Gym");
});

module.exports = router;
