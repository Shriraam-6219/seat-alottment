import React, { useState } from "react";
import hall from "../..//assets/hall.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../student/student.css';
import Axios from 'axios';

function Student() {

	const[rgnum, setrgnum] = useState("");
	const go = () => {
		console.log(rgnum);
		Axios.post("http://localhost:3001/student",{
			rgnum: rgnum
		}).then((response) => {
			console.log(response);
	});
	};

  return <div>


	<div className="container" id="container">
		<div className="form-container log-in-container">
			<form>
				<h1>ENTER YOUR REGISTRATION NUMBER</h1>


				<input type="number" placeholder="REGISTRATION NUMBER"
				onChange={(event) => {
					setrgnum(event.target.value);
					}} 
				/>
				<button onClick={go}>GO</button>
			</form>
		</div>
		<div className="overlay-container">
			<div className="overlay">
				<div className="overlay-panel overlay-right">
                <img src={hall} className="img-fluid" alt="Examination Hall"/>			
                </div>
			</div>
		</div>
	</div>

        
</div>;
}

export default Student;