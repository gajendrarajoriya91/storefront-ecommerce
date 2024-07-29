const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

const handleServerError = (res, error) => {
  console.error("Server Error:", error);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: error.message });
};

const handleNotFoundError = (res, message = "Resource not found") => {
  res.status(404).json({ message });
};

const handleBadRequestError = (res, message = "Bad Request") => {
  res.status(400).json({ message });
};

const handleUnauthorizedError = (res, message = "Unauthorized") => {
  res.status(401).json({ message });
};

const handleForbiddenError = (res, message = "Forbidden") => {
  res.status(403).json({ message });
};

module.exports = {
  handleValidationErrors,
  handleServerError,
  handleNotFoundError,
  handleBadRequestError,
  handleUnauthorizedError,
  handleForbiddenError,
};
