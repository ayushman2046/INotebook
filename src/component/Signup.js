import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Signup = (props) => {
    let navigate = useNavigate();
    const [credential,setCredential] = useState({name:"",email:"",password:"",cpassword:""})
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const {name,email,password,cpassword} = credential
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body : JSON.stringify({name,email,password})
          })
        const json = await response.json()
        if(json.success){
            // save the authtoken and redirect
            localStorage.setItem('token',json.authToken)
            navigate('/login')
            props.setalert("Succesfully created your account",'success')
        }
        else{
          props.setalert("Invalid Details","danger")
        }
    }

    const onchange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
      }
  return (
    <div className='container'>
      <h2 className='my-3'>Create an account to use iNotebook</h2>
      <form onSubmit={handlesubmit}>
      <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" value={credential.name} id="name" name='name' aria-describedby="emailHelp" placeholder="Enter name"  onChange={onchange}/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" value={credential.email} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange}/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" value={credential.password} id="password" name='password' placeholder="Password" onChange={onchange} minLength={5} required/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Confirm Password</label>
          <input type="password" className="form-control" value={credential.cpassword} id="cpassword" name="cpassword" placeholder="Confirm Password" onChange={onchange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
