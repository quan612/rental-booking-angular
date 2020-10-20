const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [4, "Min length is 4"],
    max: [32, "Max length is 32"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: [4, "Min length is 4"],
    maxlength: [32, "Max length is 32"],
    lowercase: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Min length is 6"],
  },
});

userSchema.methods.hasSamePassword = function (providedPassword) {
  return bcrypt.compareSync(providedPassword, this.password);
};

userSchema.pre("save", async function (next) {
  const user = this;

  const hashPassword = await bcrypt.hash(user.password, 10);
  user.password = hashPassword;
  next();
});

module.exports = mongoose.model("User", userSchema);
