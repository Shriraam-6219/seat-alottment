import React from "react";
import hall from "../..//assets/hall.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../student/student.css';

function Student() {
  return <div>


	<div class="container" id="container">
		<div class="form-container log-in-container">
			<form action="#">
				<h1>ENTER YOUR REGISTRATION NUMBER</h1>


				<input type="number" placeholder="REGISTRATION NUMBER" />

				<button>GO</button>
			</form>
		</div>
		<div class="overlay-container">
			<div class="overlay">
				<div class="overlay-panel overlay-right">
                <img src={hall} className="img-fluid" alt="Examination Hall"/>			
                </div>
			</div>
		</div>
	</div>

        
</div>;
}

export default Student;