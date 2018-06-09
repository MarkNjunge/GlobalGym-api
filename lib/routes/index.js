//@ts-check
const router = require("express").Router();

const userRouter = require("./userRouter");
const workoutRouter = require("./workoutRouter");
const instructorRouter = require("./instructorRouter");
const gymRouter = require("./gymRouter");

router.use("*", (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

router.get("/", (req, res) => {
  res.send("Connected to api");
});

router.use("/users", userRouter);
router.use("/workouts", workoutRouter);
router.use("/instructors", instructorRouter);
router.use("/gyms", gymRouter);

module.exports = router;
