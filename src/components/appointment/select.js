import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { connect } from "react-redux";

function CustomizedSelects(props) {
  const [appointments, setAppointments] = React.useState("confirmed");
  const handleChange = (event) => {
    setAppointments(event.target.value);
  };

  const filterAppointments = (select) => {
    switch (select) {
      case "confirmed":
        return props.appointments.filter(
          (currentApp) => currentApp.confirmation !== "en cours"
        );
      case "In progress":
        return props.appointments.filter(
          (currentApp) => currentApp.confirmation === "en cours"
        );
      default:
        return props.appointments;
    }
  };

  return (
    <div>
      <FormControl className="mr-5">
        <InputLabel htmlFor="demo-customized-select-native">
          Candidatures
        </InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={appointments}
          onChange={handleChange}
        >
          <option value={"confirmed"}>confirmed</option>
          <option value={"In progress"}>awaiting confirmation</option>
        </NativeSelect>
      </FormControl>
      {filterAppointments(appointments).map((app) => (
        <div
          className="appointment-card"
          onClick={() => props.displayDescription(app)}
        >
          <li className="appointment-header">
            <i class="fa fa-calendar mr-2 ml-2" aria-hidden="true"></i>
            {app.date}
          </li>
          {props.JobsList
            .filter((job) => job._id === app.idEmp)
            .map((job) => (
              <li className="appointment-body">
                <h6>{job.practiceName}</h6>
                <p>
                  {job.speciality}
                  <br></br>
                  {job.address}
                </p>
              </li>
            ))}
        </div>
      ))}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    JobsList: state.jobs.JobsList,
    appointments: state.app.appointments,
  };
};
export default connect(mapStateToProps)(CustomizedSelects);
