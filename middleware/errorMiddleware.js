const {
  handleServerError,
  handleNotFoundError,
} = require("../utils/errorUtils");

const notFoundMiddleware = (req, res, next) => {
  handleNotFoundError(res, "Resource not found");
};

const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err.message);

  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      message: err.message || "An error occurred",
    });
  } else {
    handleServerError(res, err);
  }
};

module.exports = {
  notFoundMiddleware,
  errorMiddleware,
};
