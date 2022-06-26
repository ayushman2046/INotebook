import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react"
import {useLocation} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  let location = useLocation();
  useEffect(() => {
    
  }, [location]);
  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">iNotebook</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==="/about" ? "active" : ""}`} to="/about">About</Link>
      </li>
    </ul>
  </div>

  {!localStorage.getItem('token')? <form className='ayushman'>
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
  </form> : <button onClick={handleLogout} className='btn btn-primary mx-2'>Logout</button>}
</nav>
  )
}

export default Navbar
