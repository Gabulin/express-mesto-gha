const { validationErrorCode } = require('../utils/Constants');

class InvalidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = validationErrorCode;
  }
}

module.exports = InvalidError;
