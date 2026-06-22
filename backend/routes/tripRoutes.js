const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  generateTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  addActivity,
  removeActivity,
  regenerateDay,
} = require(
  "../controllers/tripController"
);

router.post(
  "/generate",
  auth,
  generateTrip
);

router.get(
  "/",
  auth,
  getTrips
);

router.get(
  "/:id",
  auth,
  getTrip
);

router.put(
  "/:id",
  auth,
  updateTrip
);

router.delete(
  "/:id",
  auth,
  deleteTrip
);

router.post(
  "/:id/activities",
  auth,
  addActivity
);

router.delete(
  "/:id/activities",
  auth,
  removeActivity
);

router.post(
  "/:id/regenerate",
  auth,
  regenerateDay
);

module.exports = router;