export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      return next(new Error(err, { cause: 500 }));
    });
  };
};

export const globalHandler = (error, req, res, next) => {
  return res.status(error.cause || 500).json({
    message: error.message,
    error,
    stack: error.stack,
  });
};
