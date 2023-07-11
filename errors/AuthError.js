const { authErrorCode } = require('../utils/Constants');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = authErrorCode;
  }
}

module.exports = AuthError;
