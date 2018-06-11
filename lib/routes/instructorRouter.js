//@ts-check
const router = require("express").Router();
const { check, validationResult } = require("express-validator/check");

const Instructor = require("./../database/models/instructor");

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
  Instructor.findAll()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err.reason));
});

router.get("/:id", (req, res) => {
  Instructor.findOne(req.params.id)
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
    check("firstName").exists(),
    check("lastName").exists(),
    check("profilePhoto").exists(),
    check("email").exists(),
    check("yearOfBirth").exists(),
    check("phone").exists(),
    check("gender").exists(),
    check("country").exists()
  ],
  paramsMiddleware,
  (req, res) => {
    Instructor.register(
      req.body.firstName,
      req.body.lastName,
      req.body.profilePhoto,
      req.body.email,
      req.body.yearOfBirth,
      req.body.phone,
      req.body.gender,
      req.body.country
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
  [check("instructorId").exists()],
  paramsMiddleware,
  (req, res) => {
    Instructor.update(req.body.instructorId, req.body)
      .then(() => res.send({ message: "Instructor updated." }))
      .catch(err => res.status(500).send(err.message));
  }
);

module.exports = router;
