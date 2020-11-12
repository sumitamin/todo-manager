const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
      lowercase: true,
    },
    token: { type: String },
    password: { type: String },
    isDeleted: {
        type: Boolean,
        default: false,
      },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Users", userSchema);
