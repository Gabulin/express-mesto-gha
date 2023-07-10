const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RegisterError = require("../errors/RegisterError");
const NotFoundError = require("../errors/NotFoundError");
const InvalidError = require("../errors/InvalidError");
const { JWT_KEY } = require("../utils/Constants");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new RegisterError("Пользователь уже существует"));
      }
      if (err.name === "ValidationError") {
        return next(
          new InvalidError("Некорректные данные для создания пользователя")
        );
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY, {
        expiresIn: "7d",
      });
      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Некорректные данные для пользователя"));
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res) => {
  const { _id } = req.user;
  const data = {
    name: req.body.name,
    about: req.body.about,
  };
  User.findByIdAndUpdate(_id, data, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new InvalidError("Некорректные данные для обновления"));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { _id } = req.user;
  const data = { avatar: req.body.avatar };
  User.findByIdAndUpdate(_id, data, { runValidators: true, new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new InvalidError("Некорректные данные для ссылки"));
      }
      return next(err);
    });
};