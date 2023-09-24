const mongoose = require("mongoose");

// USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    //   IT WILL STORE CREATED_AT and UPDATED_AT

    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
