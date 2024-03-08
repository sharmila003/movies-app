import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookmarkContext } from "../App";

 function Login() {
  
  const { loggedIn, setLoggedIn, setToken, setBookmarkedResult } = useContext(BookmarkContext);
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const [data, setData] = useState({
      email: "",
      password: "",

  })
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState()


  function handleChange(e) {
      const { name, value } = e.target
      setData(prev => ({
          ...prev, [name]: value
      }))

  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log("Token:", token);

    try {
        const token = localStorage.getItem('token'); 
        const response = await axios.post('http://localhost:3001/login', {
            email: data.email,
            password: data.password,
        }, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        if (response.data.token) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token); 
            setLoggedIn(true);
            localStorage.setItem('name', data.email);
        } else {
            setError("Invalid Email/Password");
        }
    } catch (err) {
        console.error(err);
    }
}


  function handleLogout(e) {
      setToken("");
      setBookmarkedResult("");

      setLoading(true);

      setTimeout(() => {

          setLoading(false);
          setLoggedIn(false);

          navigate('/movies')

      }, 3000)

  }
  

  return (
    <main data-testid="main" className="main">
    <img className="img" src="assets/logo.svg" alt="Movie" />
    {loggedIn === false ?
        <form className="form">
            <h2 className="h2">Login</h2>
            <input onChange={handleChange} className="email" type="text" name="email" placeholder="Email Address" />
            <input onChange={handleChange} className="password" type="password" name="password" placeholder="Password" />
            <span className="error">{error}</span>
            <button className="submit lg" onClick={handleSubmit} type="submit">Login to your Account</button>
            <p className="small">Don't have an account? <a href="/signup">Sign Up</a> </p>
        </form> :



        loading ?
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div> :
            <article className="form block">
                <p className="h2 ">Logged In as</p>
                <p className="name">{name}</p>
                <button data-testid="logout-button" onClick={handleLogout} className="submit" type="botton">Logout</button>
                <a href="/"class="centered-link">Home Page</a>
            </article>
    }
</main>

  )
}

export default Login;