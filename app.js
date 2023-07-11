const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const errorMiddlware = require("./middlewares/errors");
const routes = require("./routes/routes");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorMiddlware);

async function connect() {
  await mongoose.connect("mongodb://0.0.0.0:27017/mestodb");
  app.listen(
    PORT
    //    () => {
    //   console.log('Сервер запущен');
    // }
    // eslint-disable-next-line function-paren-newline
  );
}

connect();
