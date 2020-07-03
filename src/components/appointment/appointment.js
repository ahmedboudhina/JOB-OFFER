import { connect } from "react-redux";
import { getJobs } from "../../JS/actions/jobsAction";
import {getUserCand,getEntrCand } from "../../JS/actions/appointmentsAction"
import "./appointment.css";
import DescriptionApp from "./descriptionApp";
import CustomizedSelects from  "./select.js"



import React, { Component } from 'react'

class Appointment extends Component {
    state={
        display:false,
        app:[],
        appointements : ''
    }
    componentDidMount(){
    this.props.getJobs();
    if(this.props.userType !== "Entrepreneur") this.props.getUserCand(this.props.user._id)
    else this.props.getEntrCand(this.props.user._id)
  }

    displayDescription = (currentApp)=>{
        this.setState({
            display:!this.state.display,
            app : [currentApp]
        })
    }
   handleChange = (event) => {
      this.setState({
        appointements : event.target.value
      })
    };


    render() {
        return this.props.isLoading?
        <div className="row justify-content-md-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
        :(this.props.appointments.length <= 0 ? (
            <div className="container mt-5">
              <i
                className="fa fa-calendar-o fa-4x"
                aria-hidden="true"
                style={{ color: "grey" }}
              ></i>
              <br />
              <h6>You have no candidature at this time.</h6>
            </div>
          ) : (
            <div className="container-appointment-card">
              
              <div className="appointments-list">
                <h5>Your Candidatures</h5>
                <CustomizedSelects displayDescription={this.displayDescription} />
                
              </div>
              <span className='vl'></span>
              <div className="description-true">
              {this.state.display ?<DescriptionApp appointment={this.state.app} displayDescription ={ this.displayDescription }/>:
              <div className="container mt-5">
              <i
                className="fa fa-calendar-o fa-2x"
                aria-hidden="true"
                style={{ color: "grey" }}
              ></i>
              <br />
              <p>You have no candidature at this time.</p>
                    
              </div>
              }
              
            </div>
            </div>
          ))
    }
}




const mapStateToProps = (state) => {
  return { user: state.auth.user, JobsList: state.jobs.JobsList,
appointments : state.app.appointments,
isLoading : state.app.isLoading,
userType :state.auth.userType };
};
export default connect(mapStateToProps, { getJobs,getUserCand,getEntrCand  })(Appointment);
