const { forbiddenErrorCode } = require('../utils/Constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbiddenErrorCode;
  }
}

module.exports = ForbiddenError;
