//@ts-check
const { validationResult } = require("express-validator/check");
const firebaseAdmin = require("firebase-admin");

const paramsMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: "There are errors with your request.",
      errors: errors.array().map(err => {
        return { param: err.param, message: err.msg, location: err.location };
      })
    });
  }

  next();
};

const clientAuthMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (authHeader) {
    firebaseAdmin
      .auth()
      .verifyIdToken(authHeader)
      .then(v => {
        req.params.tokenUid = v.uid;
        next();
      })
      .catch(() => res.status(401).send({ message: "Authorization failed" }));
  } else {
    res.status(401).send({ message: "No authorization header present" });
  }
};

module.exports = {
  paramsMiddleware,
  clientAuthMiddleware
};
