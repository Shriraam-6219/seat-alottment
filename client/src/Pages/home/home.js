import React from "react";
import { Link } from 'react-router-dom';
import kec from "../..//assets/kec_1.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home/home.css';

function Home() {
  return (
  <div>
    <div className="container" id="container">
      <div className="form-container log-in-container">
          
        <form action="#">

          <h1>KONGU ENGINEERING COLLEGE</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fa fa-facebook fa-2x"></i></a>
            <a href="#" className="social"><i className="fa fa-google fa-2x"></i></a>
            <a href="#" className="social"><i className="fa fa-instagram fa-2x"></i></a>
            <a href="#" className="social"><i className="fa fa-watsapp fa-2x"></i></a>
          </div>  
          
          <Link to="/student">
          <a href="./"><button className="btn btn-outline-success btn-lg">STUDENT</button></a>
          </Link>

          <Link to="/faculty">
          <button className="btn btn-outline-success btn-lg">FACULTY</button>
          </Link>

      </form>	
      </div>
      
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <img src={kec} className="img-fluid" alt="Kongu Engineering College"/>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}

export default Home;