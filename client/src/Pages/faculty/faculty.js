import React from "react";
import AB from "../..//assets/ao-block.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../student/faculty.css';

function Faculty() {
  return <div>

  <div>
    <div className="container" id="container">
      <div className="form-container log-in-container">
        <form action="#">
          <h1>Login</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fa fa-facebook fa-2x"></i></a>
            <a href="#" className="social"><i className="fa fa-google fa-2x"></i></a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" />

          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Log In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
          <img src={AB} className="img-fluid" alt="Administrative Block"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>;
}

export default Faculty;