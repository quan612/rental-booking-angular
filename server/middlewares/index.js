exports.errorHandler = (req, res, next) => {
  res.mongoError = (error) => {
    const errors = [];
    const errorField = "errors";
    if (
      error &&
      error.hasOwnProperty(errorField) &&
      error.name === "ValidationError"
    ) {
      const allErrors = error[errorField];

      for (let err in allErrors) {
        errors.push({
          title: err,
          detail: allErrors[err].detail || allErrors[err].message,
        });
      }
    } else errors.push({ title: "Db Error", detail: error });

    return res.status(422).send(errors);
  };

  next();
};
