//@ts-check
const router = require("express").Router();
const { check, query } = require("express-validator/check");

const Gym = require("./../database/models/gym");
const { paramsMiddleware } = require("./middlewares");

router.get("/", (req, res) => {
  Gym.findAll()
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message }));
});

router.get(
  "/nearby",
  [
    query(["lat", "lng", "radius"])
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    res.send(req.query);
  }
);

router.get("/:id", (req, res) => {
  Gym.findOne(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message }));
});

router.post(
  "/create",
  [
    check([
      "name",
      "logo",
      "phone",
      "website",
      "openTime",
      "closeTime",
      "country",
      "city",
      "cords"
    ])
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    Gym.create(
      req.body.name,
      req.body.logo,
      req.body.phone,
      req.body.website,
      req.body.openTime,
      req.body.closeTime,
      req.body.country,
      req.body.city,
      req.body.cords
    )
      .then(result => res.send(result))
      .catch(err => res.status(500).send({ message: err.message }));
  }
);

router.post(
  "/update",
  [
    check("gymId")
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    Gym.update(req.body.gymId, req.body)
      .then(result => res.send(result))
      .catch(err => res.status(500).send({ message: err.message }));
  }
);

router.post(
  "/images/add",
  [
    check(["gymId", "imageUrl"])
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    Gym.addImage(req.body.gymId, req.body.imageUrl)
      .then(result => res.send(result))
      .catch(err => res.status(500).send({ message: err.message }));
  }
);

router.post(
  "/images/remove",
  [
    check(["gymId", "imageUrl"])
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    Gym.removeImage(req.body.gymId, req.body.imageUrl)
      .then(result => res.send(result))
      .catch(err => res.status(500).send({ message: err.message }));
  }
);

router.post(
  "/instructors/add",
  [
    check(["gymId", "instructorId"])
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    Gym.addInstructor(req.body.gymId, req.body.instructorId)
      .then(result => res.send(result))
      .catch(err => res.status(500).send({ message: err.message }));
  }
);

router.post(
  "/instructors/remove",
  [
    check(["gymId", "instructorId"])
      .exists()
      .withMessage("Required.")
  ],
  paramsMiddleware,
  (req, res) => {
    Gym.removeInstructor(req.body.gymId, req.body.instructorId)
      .then(result => res.send(result))
      .catch(err => res.status(500).send({ message: err.message }));
  }
);

module.exports = router;
