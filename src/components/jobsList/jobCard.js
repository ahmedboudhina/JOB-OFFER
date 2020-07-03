import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./jobs.css";
import { Link } from "react-router-dom";
import { getJobs } from "../../JS/actions/jobsAction";
import { Button } from "react-bootstrap";
import axios from "axios";

function JobCard(props) {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/jobs").then((response) => {
      setJobs(response.data);
    });
  }, [props.getJobs]);

  const filterJobsList = () => {
    return jobs.filter((job) =>
      job.name.toLowerCase().trim().includes(search.toLowerCase())
    );
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="acceuil">
      <h6>Find your job and take your chance</h6>
      <input
        type="text"
        placeholder="job name , speciality ..."
        name="search"
        className="form-control search-input"
        onChange={handleChange}
      ></input>

      <div className="job-container">
        <div>
          {filterJobsList().map((job) => (
            <div className="job-card">
              <div className="avatar">
                <img
                  alt="avatar"
                  src="https://www.ellipse-avocats.com/wp-content/uploads/2020/01/Avatar-carre.jpg"
                />
                <div>
                  <Link>{job.name}</Link>
                  <h6>{job.telephone}</h6>

                  <p>
                    Adress :<br /> {job.email}
                  </p>
                  <p>
                    Description : <br /> {job.description}
                    <div style={{ display: "flex" }}>
                      <p className="mr-3">date : {job.date}</p>{" "}
                      <p>Expire date : {job.deadline}</p>
                    </div>
                  </p>

                  {props.userType == "Entrepreneur" ? null : (
                    <Link to={`appointment/${job.idEmp}`}>
                      <Button>
                        Make a Candidature</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.jobs.isLoading,
    userType: state.auth.userType,
  };
};

export default connect(mapStateToProps, { getJobs })(JobCard);
