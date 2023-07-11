const mongoose = require("mongoose");
const validator = require("validator");

const cardSchema = new mongoose.Schema(
  {
    name: {
      minlength: 2,
      maxlength: 30,
      type: String,
      required: true,
    },
    link: {
      required: true,
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Некорректная ссылка",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "user",
      },
    ],
    createdAr: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { useProjection: true },
  }
);

module.exports = mongoose.model("card", cardSchema);
