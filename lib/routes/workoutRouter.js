//@ts-check
const router = require("express").Router();
const { check } = require("express-validator/check");

const Workout = require("./../database/models/workout");
const { paramsMiddleware } = require("./middlewares");

router.get("/", (req, res) => {
  const userId = req.query.userId;

  let promise;
  if (userId) {
    promise = Workout.findForUser(userId);
  } else {
    promise = Workout.findAll();
  }

  promise
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err.message));
});

router.post(
  "/create",
  [
    check(["userId", "dateTime", "gymId", "workoutSteps"])
      .exists()
      .withMessage("Required."),
    check("dateTime")
      .isNumeric()
      .withMessage("Must be numeric"),
    check("workoutSteps")
      .isArray()
      .withMessage("Must be an array")
      .not()
      .isEmpty()
      .withMessage("Must have values")
    // TODO: finish writing this
    // .custom((values, { req }) => {
    //   return values.every(val => {
    //     return val.stepId !== undefined;
    //   });
    // })
  ],
  paramsMiddleware,
  (req, res) => {
    Workout.create(
      req.body.userId,
      req.body.dateTime,
      req.body.gymId,
      "",
      req.body.workoutSteps
    )
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).send(err.message);
      });
  }
);

router.post(
  "/update",
  [
    check("workoutId")
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    Workout.update(req.body.workoutId, req.body)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).send(err.message);
      });
  }
);

router.delete(
  "/delete",
  [
    check("workoutId")
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    Workout.delete(req.body.workoutId)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).send(err.message);
      });
  }
);

module.exports = router;
