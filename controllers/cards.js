const Card = require("../models/card");
const InvalidError = require("../errors/InvalidError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

module.exports.createCard = (req, res, next) => {
  const newCard = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };
  Card.create(newCard)
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new InvalidError("Некорректные данные для новой карточки"));
      }
      next(err);
    });
};
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError("Данные не найдены"));
      }
      if (_id === card.owner.toString()) {
        return card.deleteOne().then(() => res.send(card));
      }
      return next(
        new ForbiddenError("Некорректные данные для удаления карточки")
      );
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Данные не найдены");
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Данные не найдены");
      }
      res.send({ data: card });
    })
    .catch(next);
};