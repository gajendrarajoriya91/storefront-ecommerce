const jwt = require("jsonwebtoken");
const { handleUnauthorizedError } = require("../utils/errorUtils");
const config = require("../config/appConfig");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return handleUnauthorizedError(res, "No token provided");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    handleUnauthorizedError(res, "Invalid token");
  }
};

module.exports = authMiddleware;
