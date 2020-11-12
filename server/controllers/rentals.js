const Rental = require("../models/rental");
const Booking = require("../models/booking");
const moment = require("moment");

exports.getRentals = async (req, res, next) => {
  try {
    const { city } = req.query;
    let query = city ? { city: city.toLowerCase() } : {};

    const rentals = await Rental.find(query).populate("image");

    return res.status(200).json(rentals);
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.getRentalById = async (req, res, next) => {
  try {
    const { rentalId } = req.params;
    const rental = await Rental.findById(rentalId).populate("image");

    return res.status(200).json(rental);
  } catch (err) {
    return res.mongoError(err);
  }
};

// /api/v1/rentals/me
exports.getUserRentals = async (req, res) => {
  try {
    const { user } = res.locals;

    const userRentals = await Rental.find({ owner: user }).populate("image");

    return res.status(200).json(userRentals);
  } catch (err) {
    console.log(err);
    return res.mongoError(err);
  }
};

exports.addRental = async (req, res, next) => {
  try {
    const data = req.body;
    data.owner = res.locals.user;

    const newRental = await Rental.create(data);

    return res.status(200).json(newRental);
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.deleteRental = async (req, res, next) => {
  try {
    const { rentalId } = req.params;
    const { user } = res.locals;

    const rental = await Rental.findById(rentalId).populate("owner");
    if (!rental) return res.status(422).json({ error: "Rental not exist" });

    if (user.id !== rental.owner.id) {
      return res.status(422).json({ error: "You do not own this rental." });
    }

    //find booking with end date less than today, to filter inactive bookings
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const activeBookings = await Booking.find({
      rental,
      endDate: { $gt: yesterday },
    });

    if (activeBookings && activeBookings.length > 0) {
      console.log("Rental cannot be removed as it has active bookings");
      return res
        .status(422)
        .json({ error: "Rental cannot be removed as it has active bookings." });
    }

    rental.remove();
    return res
      .status(200)
      .json({ message: `Rental ${rental.id} was successfully removed.` });
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.updateRental = async (req, res, next) => {
  try {
    const data = req.body;
    const { rentalId } = req.params;
    const user = res.locals.user;

    const rental = await Rental.findById(rentalId)
      .populate("owner", "-password")
      .populate("image");

    if (!rental) {
      return res.status(400).json({
        message: `Cannot find this rental with id: ${rentalId}`,
      });
    }

    if (rental.owner.id !== user.id) {
      return res.status(422).json({
        message: `You are not the owner of this rental with id: ${rentalId}`,
      });
    }

    rental.set(data);
    await rental.save();
    return res
      .status(200)
      .json({ message: `Rental with id ${data.id} is updated` });
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.verifyUser = async (req, res) => {
  const { user } = res.locals;
  const { rentalId } = req.params;

  try {
    const rental = await Rental.findById(rentalId).populate("owner");

    if (rental.owner.id !== user.id) {
      return res.sendApiError({
        title: "Invalid User",
        detail: "You are not owner of this rental!",
      });
    }

    return res.status(200).json({ status: "verified" });
  } catch (error) {
    return res.mongoError(error);
  }
};

//middleware
exports.isUserOwnerRental = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const { rental } = req.body;

    if (!rental)
      return res.status(422).send({
        error: "Booking error. Cannot create booking to undefined rental.",
      });

    // find the actual rental based on rental.id above
    const currentRental = await Rental.findById(rental);
    await currentRental.populate("owner").execPopulate();

    if (currentRental.owner.id == user.id) {
      return res
        .status(422)
        .send({ error: "This rental is owned by the user" });
    }

    next();
  } catch (err) {
    return res.mongoError(err);
  }
};
