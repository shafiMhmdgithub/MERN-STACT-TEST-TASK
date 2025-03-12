
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../Auth/useToken";
import axios from "axios";
import { useQueryParams } from "../utils/useQueryParams";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = ({ toggleAuth, setIslogin }) => {
  const { loginWithRedirect, user, getIdTokenClaims, isAuthenticated } = useAuth0();
  const [, setToken] = useToken();
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const { token: oauthToken } = useQueryParams();

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate("/dashboard");
    }
  }, [oauthToken, setToken, navigate]);

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/google/url");
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (e) {
        console.log(e);
      }
    };
    loadOauthUrl();
  }, []);

  const handleFacebookLogin = async () => {
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
      
          setToken(token);//This is not setting token i need to set the 
          navigate("/dashboard");
        } catch (error) {
          console.error( error);
          if (error.response?.status === 409) {
            navigate("/dashboard");
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
        }
      }
    };

    sendFacebookDataToServer();
  }, [isAuthenticated, user, getIdTokenClaims, navigate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: emailValue,
        password: passwordValue,
      });
      const { token } = response.data;
      
      setToken(token);
      navigate("/dashboard");
    } catch (error) {
      console.log("Response not received:", error);
      setErrorMessage("Your credentials are not matching. Please try again.");
      setIslogin(true);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
           <Link to="https://solvefy.io" className="h1"><img style={{ width:"80px", height:"50px" }} src="/dist/img/logo.png" alt="ADT" />Solvefy</Link>
           
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form method="post" onSubmit={handleOnSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="form-control"
                  placeholder="Email"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mt-2 mb-3">
              <button className="btn btn-block btn-primary" onClick={handleFacebookLogin}>
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
            <p className="mb-1">
              <a href="#" onClick={handleForgotPasswordClick}>
                I forgot my password
              </a>
            </p>
            <p className="mb-0">
              <Link to="/signup" onClick={toggleAuth} className="text-center">
                Register a new membership
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
