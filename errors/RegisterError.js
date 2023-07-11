const { registerErrorCode } = require('../utils/Constants');

class RegisterError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = registerErrorCode;
  }
}

module.exports = RegisterError;
