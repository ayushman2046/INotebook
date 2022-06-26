import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
localStorage.clear()
const Login = (props) => {
    let navigate = useNavigate();
    const [credential,setCredential] = useState({email:"",password:""})
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body : JSON.stringify({email:credential.email,password:credential.password})
          })
        const json = await response.json()
        if(json.success){
            // save the authtoken and redirect
            localStorage.setItem('token',json.authToken)
            props.setalert('Successfully logged in',"success")
            navigate('/')
            
        }
        else{
            props.setalert("Invalid credential",'danger')
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
      }
    

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="form-group my-3">
                    <label htmlFor="email ">Email address</label>
                    <input type="email" className="form-control" value={credential.email} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
                        
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" value={credential.password} id="password" name='password' placeholder="Password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
