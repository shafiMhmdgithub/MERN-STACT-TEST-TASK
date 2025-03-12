
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const navigate = useNavigate();

    const onSubmitClicked = async (e) => {
        e.preventDefault();
        console.log(emailValue);
        try {
            await axios.put(`http://localhost:8080/api/forgot-password/${emailValue}`);
           setSuccess(true);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your email for a reset link</p>
        </div>
    ) : (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1"><b>Admin</b>LTE</a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
            <form onSubmit={onSubmitClicked}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="form-control"
                  placeholder="Email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">Request new password</button>
                </div>
              </div>
            </form>
            <p className="mt-3 mb-1">
              <a href="/">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
