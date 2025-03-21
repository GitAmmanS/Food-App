import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.scss";
import baseUrl from "../baseUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/user/login`, { email, password })
      .then(result => {
        console.log(result.data.message);
        if (result.data.message === "Success") {
          if (result.data.userState === "admin") {
            localStorage.setItem('login', true);
            navigate("/report");
          } else {
            console.log(result.data._id);
            localStorage.setItem('login', true);
            localStorage.setItem('userId', result.data._id);
            navigate('/');
          }
        } else {
          setError("Login failed. Please check your credentials and try again.");
        }
      })
      .catch(err => {
        console.error(err);
        setError("An error occurred. Please try again later.");
      });
  };

  useEffect(() => {
    let login = localStorage.getItem('login');
    if (login) {
      navigate('/');
    }
  });

  const fieldClear = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <>
    
    
      <div className="login-page">
      {/* <h1>Food App</h1> */}
        <div className="maincontainer">
          <h2>Madina Autos</h2>
          <span>Log In</span>
          <div className="innercontainer">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="email" 
                  required 
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <label>Email</label>
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <label>Password</label>
              </div>
              <button className="btn" type="submit">Login</button>
              <button className="btn" onClick={fieldClear}>Clear</button>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
