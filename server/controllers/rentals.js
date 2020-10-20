const Rental = require("../models/rental");

exports.getRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find({});

    return res.status(200).json(rentals);
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.getRentalById = async (req, res, next) => {
  try {
    const { rentalId } = req.params;

    const rental = await Rental.findById(rentalId);

    return res.status(200).json(rental);
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.addRental = async (req, res, next) => {
  try {
    const data = req.body;

    const newRental = await Rental.create(data);

    return res
      .status(200)
      .json({ message: `Rental added with id ${newRental._id}` });
  } catch (err) {
    return res.mongoError(err);
  }
};

// exports.deleteRental = (req, res, next) => {
//   const index = rentals.findIndex((r) => r._id === req.params.rentalId);
//   if (index !== -1) {
//     rentals.splice(index, 1);
//     return res
//       .status(200)
//       .json({ message: `Rental delete with id ${req.params.rentalId}` });
//   } else
//     return res.status(400).json({
//       message: `Cannot find this rental with id: ${req.params.rentalId}`,
//     });
// };

// exports.updateRental = (req, res, next) => {
//   const newRental = req.body;
//   const index = rentals.findIndex((r) => r._id === req.params.rentalId);
//   if (index) {
//     rentals[index] = { ...rentals[index], name: newRental.name };
//     console.log(rentals[index]);
//     return res
//       .status(200)
//       .json({ message: `Rental with id ${req.params.rentalId} is updated` });
//   } else
//     return res.status(400).json({
//       message: `Cannot find this rental with id: ${req.params.rentalId}`,
//     });
// };
