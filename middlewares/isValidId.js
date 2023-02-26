const {isValidObjectId } = require("mongoose");
const { httpErrors } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(httpErrors(400, `${id} is not a valid ID`));
  }
  next();
};

module.exports = isValidId;
