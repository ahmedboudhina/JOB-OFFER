import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import { connect } from "react-redux";
import "./appointmentApp.css";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";

class AppointmentApp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      schedule: [],
      confirmationModalOpen: false,
      appointmentDateSelected: false,
      appointmentMeridiem: 0,
      validEmail: true,
      validPhone: true,
      finished: false,
      smallScreen: window.innerWidth < 768,
      stepIndex: 0,
      address: "",
    };
  }

  handleSetAppointmentDate(date) {
    this.setState({ appointmentDate: date, confirmationTextVisible: true });
  }

  handleSetAppointmentSlot(slot) {
    this.setState({ appointmentSlot: slot });
  }
  handleSetAppointmentMeridiem(meridiem) {
    this.setState({ appointmentMeridiem: meridiem });
  }
  handleSubmit() {
    this.setState({ confirmationModalOpen: false });
    const newAppointment = {
      candidatName: this.state.firstName + " " + this.state.lastName,
      phone: this.state.phone,
      candidatId: this.props.user._id,
      idEmp: this.props.match.params.jobId,
      email: this.state.email,
    };
    axios
      .post(
        "http://localhost:5000/appointment/add_appointement",
        newAppointment
      )
      .then((response) =>
        this.setState({
          confirmationSnackbarMessage: "Appointment succesfully added!",
          confirmationSnackbarOpen: true,
          processed: true,
        })
      )
      .catch((err) => {
        console.log(err);
        return this.setState({
          confirmationSnackbarMessage: "Appointment failed to save.",
          confirmationSnackbarOpen: true,
        });
      });
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    window.location.href = "http://localhost:3000/jobs";
  };

  checkDisableDate(day) {
    const dateString = moment(day).format("YYYY-DD-MM");
    return (
      this.state.schedule[dateString] === true ||
      moment(day).startOf("day").diff(moment().startOf("day")) < 0
    );
  }

  renderAppointmentConfirmation() {
    const spanStyle = { color: "#00C853" };
    return (
      <section>
        <p>
          Name:{" "}
          <span style={spanStyle}>
            {this.state.firstName} {this.state.lastName}
          </span>
        </p>
        <p>
          Number: <span style={spanStyle}>{this.state.phone}</span>
        </p>

        <p>
          Appointment:{" "}
          <span style={spanStyle}>
            {moment(this.state.appointmentDate).format(
              "dddd[,] MMMM Do[,] YYYY"
            )}
          </span>{" "}
          at{" "}
          <span style={spanStyle}>
            {moment()
              .hour(9)
              .minute(0)
              .add(this.state.appointmentSlot, "hours")
              .format("h:mm a")}
          </span>
        </p>
      </section>
    );
  }
  renderAppointmentTimes() {
    if (!this.state.isLoading) {
      const slots = [...Array(8).keys()];
      return slots.map((slot) => {
        const appointmentDateString = moment(this.state.appointmentDate).format(
          "YYYY-DD-MM"
        );
        const time1 = moment().hour(9).minute(0).add(slot, "hours");
        const time2 = moment()
          .hour(9)
          .minute(0)
          .add(slot + 1, "hours");
        const scheduleDisabled = this.state.schedule[appointmentDateString]
          ? this.state.schedule[
              moment(this.state.appointmentDate).format("YYYY-DD-MM")
            ][slot]
          : false;
        const meridiemDisabled = this.state.appointmentMeridiem
          ? time1.format("a") === "am"
          : time1.format("a") === "pm";
        return (
          <RadioButton
            label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
            key={slot}
            value={slot}
            style={{
              marginBottom: 15,
              display: meridiemDisabled ? "none" : "inherit",
            }}
            disabled={scheduleDisabled || meridiemDisabled}
          />
        );
      });
    } else {
      return null;
    }
  }

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: "12px 0" }}>
        <RaisedButton
          label="Finish"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={()=>
            this.setState({
              confirmationModalOpen: !this.state.confirmationModalOpen,
            })
          }
          backgroundColor="#00C853 !important"
          style={{ marginRight: 12, backgroundColor: "#00C853" }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            // disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {
      finished,
      isLoading,
      smallScreen,
      stepIndex,
      confirmationModalOpen,
      confirmationSnackbarOpen,
      ...data
    } = this.state;
    const contactFormFilled =
      false;
    const DatePickerExampleSimple = () => (
      <div>
        <DatePicker
          hintText="Select Date"
          mode={smallScreen ? "portrait" : "landscape"}
          onChange={(n, date) => this.handleSetAppointmentDate(date)}
          shouldDisableDate={(day) => this.checkDisableDate(day)}
        />
      </div>
    );
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() => this.setState({ confirmationModalOpen: false })}
      />,
      <FlatButton
        label="Confirm"
        style={{ backgroundColor: "#00C853 !important" }}
        primary={true}
        onClick={() => this.handleSubmit()}
      />,
    ];
    return (
      <div className="container-appointmentApp">
        <h5>
          Your job interview From your home.<br></br>
        </h5>

        <section
          style={{
            maxWidth: !smallScreen ? "80%" : "100%",
            margin: "auto",
            marginTop: !smallScreen ? 20 : 0,
          }}
        >
          <Card
            className="stepper"
            style={{
              padding: "12px 12px 25px 12px",
              height: smallScreen ? "100vh" : null,
            }}
          >
            <Stepper
              activeStep={stepIndex}
              orientation="vertical"
              linear={false}
            >
              <Step>
                <StepLabel>
                  Share your contact information with us and we'll send you a
                  reminder
                </StepLabel>
                <StepContent>
                  <p>
                    <section>
                      <TextField
                        style={{ display: "block" }}
                        name="first_name"
                        hintText="First Name"
                        floatingLabelText="First Name"
                        onChange={(evt, newValue) =>
                          this.setState({ firstName: newValue })
                        }
                      />
                      <TextField
                        style={{ display: "block" }}
                        name="last_name"
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                        onChange={(evt, newValue) =>
                          this.setState({ lastName: newValue })
                        }
                      />
                      <TextField
                        style={{ display: "block" }}
                        name="phone"
                        hintText="+2348995989"
                        floatingLabelText="Phone"
                        errorText={
                          data.validPhone ? null : "Enter a valid phone number"
                        }
                        onChange={(evt, newValue) =>
                          this.setState({ phone: newValue })
                        }
                      />
                      <TextField
                        style={{ display: "block" }}
                        name="Adress"
                        hintText="Your address"
                        floatingLabelText="Adress"
                        onChange={(evt, newValue) =>
                          this.setState({ address: newValue })
                        }
                      />
                      <TextField
                        style={{ display: "block" }}
                        name="Email"
                        hintText="Your Email"
                        floatingLabelText="Email"
                        onChange={(evt, newValue) =>
                          this.setState({ email: newValue })
                        }
                      />
                      <RaisedButton
                        style={{
                          display: "block",
                          backgroundColor: "#00C853",
                          marginTop: 20,
                        }}
                        label={
                          contactFormFilled
                            ? "Schedule"
                            : "Fill out your information"
                        }
                        labelPosition="before"
                        primary={true}
                        fullWidth={true}
                        onClick={() =>
                          this.setState({
                            confirmationModalOpen: !this.state
                              .confirmationModalOpen,
                          })
                        }
                        disabled={!contactFormFilled || data.processed}
                      />
                    </section>
                  </p>
                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
            </Stepper>
          </Card>
          <Dialog
            modal={true}
            open={confirmationModalOpen}
            actions={modalActions}
            title="Confirm your appointment"
          >
            {this.renderAppointmentConfirmation()}
          </Dialog>
          <SnackBar
            open={confirmationSnackbarOpen || isLoading}
            message={
              isLoading ? "Loading... " : data.confirmationSnackbarMessage || ""
            }
            autoHideDuration={10000}
            onRequestClose={() =>
              this.setState({ confirmationSnackbarOpen: false })
            }
          />
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.auth.user };
};
export default connect(mapStateToProps)(AppointmentApp);
