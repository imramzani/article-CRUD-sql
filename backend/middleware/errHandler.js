function errorHandler(err, req, res, next) {
  console.log(err.name, err, "ERROR HANDLER");

  let errors = [];
  switch (err.name) {
    case "SequelizeValidationError":
      err.errors.forEach((e) => {
        errors.push(e.message);
      });
      res.status(400).json({ Error: errors, code: 400, success: false });
      errors = [];
      break;
    case "SequelizeUniqueConstraintError":
      err.errors.forEach((e) => {
        errors.push(e.message);
      });
      res.status(400).json({ Error: errors,code: 400, success: false });
      errors = [];
      break;
    case "articleNotFound":
      res.status(404).json({ Error: "Article not found", code: 404, success: false });
      break;
    default:
      res.status(500).json({ Error: "Internal server error", code: 500, success: false });
      break;
  }
}

module.exports = errorHandler;