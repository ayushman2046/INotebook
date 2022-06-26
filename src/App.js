import "./App.css";
import {React, useState} from "react";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import About from "./component/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notestate from "./context/notes/NoteState";
import Alert from './component/Alert'
import Login from './component/Login'
import Signup from "./component/Signup";

function App() {
  const [alert,setAlert] = useState(null)
  const setalert = (message,type) =>{
    setAlert({
      massage : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home setalert={setalert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login setalert={setalert}/>} />
              <Route exact path="/signup" element={<Signup setalert={setalert} />} />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;