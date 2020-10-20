const express = require("express");
const router = express.Router();

const {
  getRentals,
  getRentalById,
  addRental,
  // deleteRental,
  // updateRental,
} = require("../controllers/rentals");

router.get("", getRentals);
router.get("/:rentalId", getRentalById);
router.post("", addRental);
// router.delete("/:rentalId", deleteRental);
// router.patch("/:rentalId", updateRental);

module.exports = router;
