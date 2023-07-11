const jwt = require("jsonwebtoken");
const AuthError = require("../errors/AuthError");
const { JWT_KEY } = require("../utils/constants");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AuthError("Необходимо авторизоваться"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    return next(new AuthError("Необходимо авторизоваться"));
  }
  req.user = payload;
  return next();
};
