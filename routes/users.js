const userRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUser,
} = require("../controllers/users");

userRouter.get("/", getUsers);
userRouter.get("/me", getUser);
userRouter.get(
  "/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserById
);

userRouter.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile
);

userRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .pattern(
          /^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im
        )
        .required(),
    }),
  }),
  updateAvatar
);

module.exports = userRouter;
