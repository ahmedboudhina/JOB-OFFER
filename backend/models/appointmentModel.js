const mongoose = require("mongoose");

const appointment = mongoose.Schema({
  candidatName: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  candidatId: {
    type: String,
    require: true,
  },
  idEmp: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    require: true,
  },
  confirmation: {
    type: String,
    require: true,
    default: "en cours",
  },
});

module.exports = mongoose.model("apointments", appointment);
