import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../Auth/useToken';
import { useQueryParams } from "../utils/useQueryParams";
import { useAuth0 } from '@auth0/auth0-react';

const SignUpPage = () => {
  const { loginWithRedirect, user, getIdTokenClaims, isAuthenticated } = useAuth0();
  console.log(user);

  const [token,setToken] =useToken();
  const navigate = useNavigate();
  const [fullNameValue,setFullNameValue]=useState();
  const [emailValue,setEmailValue]=useState();
  const [passwordValue,setPasswordValue]=useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const { token: oauthToken } = useQueryParams();
  const [confirmPasswordValue,setConfirmPasswordValue]=useState('');
 useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate("/dashboard");
    }
  }, [oauthToken, setToken, navigate]);

  const handleFacebookSingup = async () => {
    try {
      await loginWithRedirect({
        connection: 'facebook',
        redirectUri: 'http://localhost:5173',
      });
    } catch (error) {
      console.error("Facebook Login Error:", error);
      setErrorMessage("Failed to log in with Facebook. Please try again.");
    }
  };

  useEffect(() => {
    const sendFacebookDataToServer = async () => {
      if (isAuthenticated && user) {
        console.log(user.name);
        try {
          const idToken = await getIdTokenClaims();
          const token = idToken.__raw;

          const responce=await axios.post("http://localhost:8080/api/auth/facebook", {
          
            name: user.name,
            facebookId: user.sub,
            token,
          });
        const{token:backendToken} =responce.data;
      
          setToken(backendToken);//This is not setting token i need to set the 
          navigate("/dashboard");
        } catch (error) {
          console.error("Error sending Facebook user data:", error);
          if (error.response?.status === 409) {
            setErrorMessage("Facebook User already exists. Please try again");
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
        }
      }
    };

    sendFacebookDataToServer();
  }, [isAuthenticated, user, getIdTokenClaims, navigate]);

const handleOnSubmit=async(e)=>{
  e.preventDefault();
  console.log("Name:",fullNameValue,"Email:",emailValue,"password:",passwordValue);
  try{
    const response = await axios.post('http://localhost:8080/api/signup',{
    name: fullNameValue,
    email: emailValue,
    password: passwordValue
   });
    const { token } = response.data;
    setToken(token);
    navigate('/please-verify');
  }catch(error){
    console.log(error);
    // Check if error.response exists and then check its status code
  if (error.response?.status === 409) {
    setErrorMessage("User already exists. Please try again");
  } else {
    setErrorMessage("An error occurred. Please try again.");
  }
   
  }
}

  return (
   <div className="hold-transition register-page">
  <div className="register-box">
    <div className="card card-outline card-primary">
      <div className="card-header text-center">
      
        <Link to="https://solvefy.io" className="h1"><img style={{ width:"80px", height:"50px" }} src="/dist/img/logo.png" alt="ADT" />Solvefy</Link>
      </div>
      <div className="card-body">
        <p className="login-box-msg">Register a new membership</p>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleOnSubmit} method="post">
          <div className="input-group mb-3">
            <input type="text" value={fullNameValue} 
            onChange={e=>setFullNameValue(e.target.value)}
             className="form-control" placeholder="Full name" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-user" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input type="email" value={emailValue}
            onChange={e=>setEmailValue(e.target.value)}
            className="form-control" placeholder="Email" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input type="password" value={passwordValue}
            onChange={e=>setPasswordValue(e.target.value)}
            className="form-control" placeholder="Password" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input type="password" value={confirmPasswordValue}
            onChange={e=>setConfirmPasswordValue(e.target.value)}
            className="form-control" placeholder="Retype password" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              {/* <div className="icheck-primary">
                <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
                <label htmlFor="agreeTerms">
                  I agree to the <a href="#">terms</a>
                </label>
              </div> */}
            </div>
            {/* /.col */}
            <div className="col-4">
              <button
              disabled={!fullNameValue || !emailValue ||
                passwordValue !== confirmPasswordValue
              }
              type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
            {/* /.col */}
          </div>
        </form>
        <div className="social-auth-links text-center mt-2 mb-3">
              <button className="btn btn-block btn-primary" onClick={handleFacebookSingup}>
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </button>
              <button
                className="btn btn-block btn-danger"
                disabled={!googleOauthUrl}
                onClick={() => {
                  window.location.href = googleOauthUrl;
                }}
              >
                <i className="fab fa-google-plus mr-2" /> Sign in using Google
              </button>
            </div>
        <Link to="/login"  className="text-center">I already have a membership</Link>
      </div>
      {/* /.form-box */}
    </div>{/* /.card */}
  </div>
  {/* /.register-box */}</div>

  )
}

export default SignUpPage;