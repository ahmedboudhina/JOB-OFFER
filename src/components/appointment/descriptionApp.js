import {connect} from 'react-redux'
import {deleteAppointment,confirmAppointment} from "../../JS/actions/appointmentsAction"
import React, { Component } from 'react'


class DescriptionApp extends Component {
  handleDelete=(id)=>{
    this.props.deleteAppointment(id)
    this.props.displayDescription([])
  }
  handleConfirm=(id)=>{
    this.props.confirmAppointment(id)
  }
  render() {
    return (
      <div className="appointment-details">
          {this.props.appointment.map(currentApp=>
              <div key={currentApp._id}>
          <li className="appointment-header">
            <i className="fa fa-calendar mr-2 ml-2" aria-hidden="true"></i>
            {currentApp.date}
          </li>
          {this.props.jobsList
            .filter((entr) => entr._id === currentApp.idEmp)
            .map((entr) => (
                <>
              <li className="appointment-body">
                <h6>{entr.practiceName}</h6>
                <p>
                  {entr.speciality}
                  <br></br>
                  {entr.address}
                </p>
              </li>
              <hr></hr>
              <li className ="container">
              <i className="fa fa-times mr-2 cancel-app mr-4" aria-hidden="true"
              onClick={()=>this.handleDelete(currentApp._id)}
              > Cancel candidature</i>
              {this.props.userType!=="Entrepreneur"?null :
              currentApp.confirmation ==='confirmed' ?null:
             <i class="fa fa-check confirm-app" aria-hidden="true" onClick={
               ()=>this.handleConfirm(currentApp._id)}> Select candidature</i>
            }
                   </li>
                   <hr></hr>

              <li className='li-details'>
                  <h6> <i className="fa fa-user mr-2" aria-hidden="true"/> Candidat Name </h6> 
                  <p className ='p-details'>
                  {currentApp.candidatName}
                  </p>
              </li>
              <hr></hr>
              <li  className='li-details'><h6><i className="fa fa-phone mr-2" aria-hidden="true"/>
              {this.props.userType =="Entrepreneur"?'Candidat Phone':"Contact Phone"} </h6>
              <p className ='p-details'>
              {this.props.userType =="Entrepreneur"?currentApp.phone:entr.phone}
              </p>
              </li>
              <hr></hr>
              <li  className='li-details'><h6><i className="fa fa-envelope-o mr-2" aria-hidden="true"/>
              {this.props.userType =="Entrepreneur"?'Candidat Email':"Contact Email"}</h6>
              <p className ='p-details'>
              {this.props.userType =="Entrepreneur"?currentApp.email:entr.email}
              </p>
              </li>
              <hr></hr>
              <li  className='li-details'><h6><i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
              Address</h6>
              <p className ='p-details'>
              {entr.address}
              </p>
              </li>
              <div className="container">
              </div>
              </>
            ))}
              </div>
              )}
   </div>
  )
  }
}


 
const mapStateToProps = (state) => {
    return {jobsList: state.jobs.JobsList,
        user: state.auth.user,
        userType :state.auth.userType
      };
  };

export default  connect(mapStateToProps,{deleteAppointment,confirmAppointment}) (DescriptionApp)