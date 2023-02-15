import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import Home from "./Pages/home/home";
import Faculty  from "./Pages/faculty/faculty";
import Student  from "./Pages/student/student";
import  ErrorPage from "./Pages/ErrorPage"

function App() {
  return (
    <div className="App">      

      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/student" element={<Student />} />
        <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
              
    </div>
  );
}

export default App;
