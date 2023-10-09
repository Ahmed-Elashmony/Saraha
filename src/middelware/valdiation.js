export const validation = (Schema) => {
  return (req, res, next) => {
    const validationResult = Schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
      },
      { abortEarly: false }
    );
    if (validationResult.error) {
      return res.json({
        message: "Validation Error",
        ValidationErr: validationResult.error.details,
      });
    }
    return next();
  };
};
