const Booking = require("../models/booking");
const Rental = require("../models/rental");
const moment = require("moment");

exports.createBooking = async (req, res, next) => {
  try {
    const bookingData = req.body;

    console.log(bookingData.startDate);
    console.log(bookingData.endDate);
    console.log(moment(bookingData.startDate).utc().format());
    console.log(moment(bookingData.endDate).utc().format());

    const newBooking = new Booking({
      ...bookingData,
      startDate: moment(bookingData.startDate).utc().format(),
      endDate: moment(bookingData.endDate).utc().format(),
      user: res.locals.user,
    });

    if (!checkIfBookingDatesAreValid(newBooking)) {
      return res
        .status(200)
        .json({ title: "Invalid Booking", detail: "Dates are invalid!" });
    }

    console.log(newBooking.startDate);
    console.log(newBooking.endDate);

    const existingBookings = await Booking.find({ rental: newBooking.rental });

    if (checkBookingValid(newBooking, existingBookings)) {
      const savedBooking = await newBooking.save();

      return res.status(200).json({
        startDate: savedBooking.startDate,
        endDate: savedBooking.endDate,
      });
    } else
      return res
        .status(422)
        .json({ error: "Booking Invalid. Dates are taken." });
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.getBookings = async (req, res) => {
  const { rental } = req.query;

  const query = rental ? Booking.find({ rental }) : Booking.find({});

  try {
    const bookings = await query.select("startDate endDate -_id").exec();
    return res.status(200).json(bookings);
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { user } = res.locals;
    const userBookings = await Booking.find({ user })
      .populate("user", "-password")
      .populate("rental");

    return res.status(200).json(userBookings);
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.getReceivedBookings = async (req, res) => {
  try {
    const { user } = res.locals;

    //rentals own by this user
    const rentals = await Rental.find({ owner: user }, "_id");
    const rentalIds = rentals.map((r) => r.id);
    const bookings = await Booking.find({ rental: { $in: rentalIds } })
      .populate("user", "-password")
      .populate("rental");

    return res.status(200).json(bookings);
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { user } = res.locals;
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate("user");

    if (user.id !== booking.user.id) {
      return res.status(422).json({ error: "You do not own this booking." });
    }

    if (moment(booking.startDate).diff(moment(), "days") < 3) {
      return res
        .status(422)
        .json({ error: "Cannot delete booking within 3 days." });
    }

    //delete the booking
    await booking.remove();
    return res.status(200).json({ id: bookingId });
  } catch (err) {
    return res.mongoError(err);
  }
};

const checkIfBookingDatesAreValid = (booking) => {
  if (!booking.startDate || !booking.endDate) return false;

  if (moment(booking.startDate) > moment(booking.endDate)) return false;

  return true;
};

const checkBookingValid = (newBooking, existingBookings) => {
  if (existingBookings && existingBookings.length > 0) {
    const newStart = moment(newBooking.startDate);
    const newEnd = moment(newBooking.endDate);

    return existingBookings.every((booking) => {
      const existingStart = moment(booking.startDate);
      const existingEnd = moment(booking.endDate);

      return (
        (existingStart < newStart && existingEnd < newStart) ||
        (newEnd < existingStart && newEnd < existingEnd)
      );
    });
  }
  return true;
};
