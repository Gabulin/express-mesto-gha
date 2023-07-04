const validationErrorCode = 400;
const notFoundErrorCode = 404;
const defaultErrorCode = 500;
const defaultErrorMessage = 'На сервере произошла ошибка';

const handleDefaultError = (err, res) => {
  res.status(defaultErrorCode).send({ message: defaultErrorMessage });
};

module.exports = {
  validationErrorCode,
  notFoundErrorCode,
  defaultErrorCode,
  handleDefaultError,
};
