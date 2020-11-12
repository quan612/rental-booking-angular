const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: [128, "Maximum title length is 128 characters"],
  },
  city: { type: String, required: true, lowercase: true },
  street: {
    type: String,
    required: true,
    minlength: [4, "Minimum street length is 4 characters"],
  },
  category: { type: String, required: true, lowercase: true },

  numOfRooms: { type: Number, required: true },
  description: { type: String, required: true },
  dailyPrice: { type: Number, required: true },
  shared: Boolean,
  image: { type: Schema.Types.ObjectId, ref: "CloudImage" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rental", rentalSchema);
