//@ts-check
const { validationResult } = require("express-validator/check");

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

module.exports = {
  paramsMiddleware
};
