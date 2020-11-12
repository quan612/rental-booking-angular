const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  getUserBookings,
  getReceivedBookings,
  deleteBooking,
} = require("../controllers/booking");

const { authUser } = require("../controllers/user");
const { isUserOwnerRental } = require("../controllers/rentals");

router.get("", getBookings);
router.get("/me", authUser, getUserBookings);
router.get("/received", authUser, getReceivedBookings);
router.post("", authUser, isUserOwnerRental, createBooking);
router.delete("/:bookingId", authUser, deleteBooking);

module.exports = router;
