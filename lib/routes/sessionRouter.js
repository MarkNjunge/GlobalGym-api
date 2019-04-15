//@ts-check
const router = require("express").Router();
const { check } = require("express-validator/check");

const Session = require("../database/models/session");
const { paramsMiddleware, clientAuthMiddleware } = require("./middlewares");

router.get("/", (req, res) => {
  Session.findAll()
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message }));
});

router.get("/:id", clientAuthMiddleware, (req, res) => {
  const uid = req.params.id;

  if (uid != req.params.tokenUid) {
    res.status(401).send({ message: "Authorization failed" });
    return;
  }

  Session.findForUser(uid)
    .then(result => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({ message: "There is no user with that id." });
      }
    })
    .catch(err => res.status(500).send(err.reason));
});

router.post(
  "/create",
  [
    check(["userId", "sessionName", "dateTime", "gymId", "sessionSteps"])
      .exists()
      .withMessage("Required."),
    check("dateTime")
      .isNumeric()
      .withMessage("Must be numeric"),
    check("sessionSteps")
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
  clientAuthMiddleware,
  (req, res) => {
    const uid = req.body.userId;

    if (uid != req.params.tokenUid) {
      res.status(401).send({ message: "Authorization failed" });
      return;
    }

    Session.create(
      req.body.userId,
      req.body.sessionName,
      req.body.dateTime,
      req.body.gymId,
      req.body.sessionSteps
    )
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
);

router.post(
  "/update",
  [
    check("sessionId")
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    Session.update(req.body.sessionId, req.body)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
);

router.delete("/delete/:id", (req, res) => {
  Session.delete(req.params.id)
    .then(() => {
      res.send({ message: "Session deleted." });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
