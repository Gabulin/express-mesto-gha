const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      required: true,
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      required: true,
      type: String,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toJSON: { useProjection: true },
  }
);

userSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new AuthError("Некорректные почта и/или пароль");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthError("Некорректные почта и/или пароль");
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
