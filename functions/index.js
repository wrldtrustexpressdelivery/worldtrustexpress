/**
 * Firebase Functions entry point
 * Clean setup for APIs moved inside the functions/ folder
 */

require("dotenv").config(); // Load .env for all functions

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// Set global options for all functions
setGlobalOptions({ maxInstances: 10 });

// ------------------------
// Import API handlers
// ------------------------
const newShipment = require("./newShipment");
const paymentConfirmation = require("./paymentConfirmation");

// ------------------------
// Optional error wrapper
// ------------------------
const wrapAsync = fn => (req, res) => {
  try {
    return fn(req, res);
  } catch (err) {
    logger.error("Function error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// ------------------------
// Expose Firebase functions
// ------------------------
exports.newShipment = onRequest(wrapAsync(newShipment));
exports.paymentConfirmation = onRequest(wrapAsync(paymentConfirmation));

// ------------------------
// Optional starter function
// ------------------------
exports.helloWorld = onRequest((req, res) => {
  logger.info("Hello logs!", { structuredData: true });
  res.send("Hello from Firebase!");
});
