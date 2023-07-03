const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { notFoundErrorCode } = require('./utils/Constants');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.user = {
    _id: '649c4dc9661dd58089f28ac5',
  };
  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res
    .status(notFoundErrorCode)
    .send({ message: 'Путь не найден' });
});

app.listen(PORT);
