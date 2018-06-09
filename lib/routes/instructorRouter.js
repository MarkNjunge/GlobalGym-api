//@ts-check
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Instructor");
});

module.exports = router;
