//@ts-check
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Workout");
});

module.exports = router;
