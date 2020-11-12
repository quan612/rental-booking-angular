const express = require("express");
const router = express.Router();

const {
  getRentals,
  getRentalById,
  getUserRentals,
  addRental,
  deleteRental,
  updateRental,
  verifyUser,
} = require("../controllers/rentals");

const { authUser } = require("../controllers/user");

router.get("", getRentals);
router.get("/me", authUser, getUserRentals);
router.get("/:rentalId", getRentalById);
router.get("/:rentalId/verify-user", authUser, verifyUser);

router.post("/add", authUser, addRental);
router.delete("/:rentalId", authUser, deleteRental);
router.patch("/:rentalId", authUser, updateRental);

module.exports = router;
