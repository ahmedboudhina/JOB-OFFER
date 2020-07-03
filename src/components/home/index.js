import React from "react";
import { Carousel} from "react-bootstrap"
import "./home.css";

function Home() {
  return (
    <div className="home">
      <h3>
      </h3>
      <div className="home-bar">
        <h6></h6>
      </div>
      <div className="container-presentation">
        <div className="home-body">
          <h5>
            <i
              className="fa fa-user-o"
              aria-hidden="true"
              style={{ color: "#0596de", margin: "5px" }}
            ></i>
            Are you looking for a job ?
          </h5><br></br>
          <h6>
          <ul>
            <li>register for free and get a job offer account</li>
            <li>find an offer </li>
            <li>good luck</li>
            </ul></h6>
        </div>
        <div className="nn">
          <h5>
            <i
              className="fa fa-handshake-o"
              aria-hidden="true"
              style={{ color: "#0596de", margin: "5px" }}
            ></i>
           You are entrepreneur
          </h5><br></br>
          <h6>
          <ul>
            <li>contact us to have a free entreprise job offer account </li>
            <li>post any annonce easy and free</li>
            
          </ul></h6>
        </div>
      </div>
      <div className='container mt-5'>
      <h4>How it works ?</h4>
      <div className='how-work mt-5'>
      <div className="how-work-before">
     
   
      </div>
      <div className="how-work-after">
      
      <p>   
      
      </p>
      </div>
      </div>
      </div>
      <footer>
   
      </footer>
   
    </div>
  );
}

export default Home;
