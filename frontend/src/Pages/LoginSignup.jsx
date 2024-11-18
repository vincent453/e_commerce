import React, { useState } from 'react';
import './CSS/Login-Signup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  // Password strength checker function
  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Function to give real-time feedback on password strength
  const getPasswordStrength = (password) => {
    if (!password) return '';
    if (password.length < 8) return 'Too short';
    if (!/[A-Z]/.test(password)) return 'Add an uppercase letter';
    if (!/[a-z]/.test(password)) return 'Add a lowercase letter';
    if (!/\d/.test(password)) return 'Add a number';
    if (!/[@$!%*?&]/.test(password)) return 'Add a special character';
    return 'Strong password';
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data);
    
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    // Validate password strength before proceeding
    if (!isStrongPassword(formData.password)) {
      alert("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    console.log("signup", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data);
    
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === "Sign Up" && 
            <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder="Your Name" />}
          <input name='email' value={formData.email} type='email' onChange={changeHandler} placeholder="Email Address" />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder="Your Password" />
          {/* Password strength feedback */}
          {state === "Sign Up" && <p>{getPasswordStrength(formData.password)}</p>}
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" && <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>}
        {state === "Login" && <p className='loginsignup-login'>Create an account <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By Continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
