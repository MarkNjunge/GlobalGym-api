//@ts-check
const router = require("express").Router();
const { check, validationResult } = require("express-validator/check");

const User = require("./../database/models/user");

const paramsMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: "Required parameters have not been provided",
      missing: errors.array().map(err => err.param)
    });
  }

  next();
};

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
    check("userId").exists(),
    check("firstName").exists(),
    check("lastName").exists(),
    check("email").exists(),
    check("phone").exists(),
    check("profilePhoto").exists(),
    check("yearOfBirth").exists(),
    check("gender").exists(),
    check("country").exists(),
    check("weight").exists(),
    check("targetWeight").exists()
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
  [check("userId").exists()],
  paramsMiddleware,
  (req, res) => {
    User.update(req.body.userId, req.body)
      .then(() => res.send({ message: "User updated." }))
      .catch(err => res.status(500).send(err.message));
  }
);

module.exports = router;
