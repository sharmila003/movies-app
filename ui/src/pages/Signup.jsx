import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  Topicon   from  "../icons/topicon.jpeg";
function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
      email: "",
      password: "",
      verify: "",
  })

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false);


  function handleChange(e) {
      const { name, value } = e.target;
      setData(prev => ({ ...prev, [name]: value }))

  }

  async function handleSubmit(e) {
      e.preventDefault();

      if (!data.verify || data.verify !== data.password) {
          setError("Passwords do not match");
          return
      }

      else if (data.password.length < 6) {
          setError("At least 6 characters");
          return
      }
      else {
          await axios.post('http://localhost:3001/register', {
              email: data.email,
              password: data.password,
          }, {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          });

      }
      setLoading(true);

      setTimeout(() => {
          setLoading(false);
          navigate('/login');

      }, 3000);
  };

  return (
    <main className="main">
    <img className="img" src={Topicon} alt="Movie" srcset="" />
    {!loading ?

        <form className="form register-form">
            <h2 className="h2">Sign Up</h2>
            <input onChange={handleChange} name="email" type="email" className="email" placeholder="Email Address" />
            <input onChange={handleChange} name="password" className="password" type="password" placeholder="Password" />
            <span className="error">{error}</span>

            <input onChange={handleChange} className="password" name="verify" type="password" placeholder="Repeat Password" />
            <button className="submit" onClick={handleSubmit} type="submit">Create an Account</button>
            <p className="small">Already have an account? <a href="/login">Login</a> </p>
        </form> :

        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>

    }
</main>

  )
}

export  default  Signup;