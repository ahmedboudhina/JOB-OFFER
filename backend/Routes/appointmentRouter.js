const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentModel");

// GETTING THE APPOINTEMENT OF A CANDIDAT ID
router.get("/:id", async (req, res) => {
  try {
    const appointments = await Appointment.find({ candidatId: req.params.id });
    res.status(200).send(appointments);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// GETTING THE APPOINTMENT OF A ENTREP ID
router.get("/entr_appointments/:id", async (req, res) => {
  try {
    const appointments = await Appointment.find({ idEmp: req.params.id });
    res.status(200).send(appointments);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// POST AN APPIONTMENT
router.post("/add_appointement", async (req, res) => {
  const appointment = new Appointment({
    candidatName: req.body.candidatName,
    phone: req.body.phone,
    candidatId: req.body.candidatId,
    idEmp: req.body.idEmp,
    email: req.body.email,
  });
  try {
    const savedAppointment = await appointment.save();
    res.status(200).send("An appointement added");
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// DELETE AN APPOINTMENT

router.delete("/delete_app/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("appointment deleted successfully");
  } catch (err) {
    res.status(400).send("Failed Delete");
  }
});

// CONFIRM AN APPOINTMENT
router.patch("/confirm_app/:id", async (req, res) => {
  // update confirmation
  try {
    await Appointment.updateOne(
      { _id: req.params.id },
      { $set: { confirmation: "confirmed" } }
    );
    res.status(200).send("apointment Confirmed");
  } catch (err) {
    res.status(400).send("Error : ", err);
  }
});

module.exports = router;
