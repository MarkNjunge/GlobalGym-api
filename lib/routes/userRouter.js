//@ts-check
const router = require("express").Router();
const { check } = require("express-validator/check");

const User = require("./../database/models/user");
const { paramsMiddleware } = require("./middlewares");

router.get("/", (req, res) => {
  User.findAll()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err.reason));
});

router.get("/:id", (req, res) => {
  User.findOne(req.params.id)
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
  "/register",
  [
    check([
      "userId",
      "firstName",
      "lastName",
      "email",
      "phone",
      "profilePhoto",
      "yearOfBirth",
      "gender",
      "country",
      "weight",
      "targetWeight"
    ])
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    User.register(
      req.body.userId,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
      req.body.profilePhoto,
      req.body.yearOfBirth,
      req.body.gender,
      req.body.country,
      req.body.weight,
      req.body.targetWeight
    )
      .then(result => res.status(201).send(result))
      .catch(err => {
        if (err.message.startsWith("E11000")) {
          res.status(403).send({ message: err.message });
        } else {
          res.status(500).send({ message: err.message });
        }
      });
  }
);

router.post(
  "/update",
  [
    check("userId")
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    User.update(req.body.userId, req.body)
      .then(() => res.send({ message: "User updated." }))
      .catch(err => res.status(500).send(err.message));
  }
);

module.exports = router;
