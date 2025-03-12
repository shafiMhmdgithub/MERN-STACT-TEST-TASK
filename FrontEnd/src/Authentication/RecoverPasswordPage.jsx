

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PasswordResetFail } from './PasswordResetFail';
import { PasswordResetSuccess } from './PasswordResetSuccess';

const RecoverPasswordPage = () => {
    const [passwordValue, setPasswordValue] = useState('');
    const [newPasswordValue, setNewPasswordValue] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const { passwordResetCode  } = useParams(); // Extract userId from params

    const onResetClicked = async (e) => {
      e.preventDefault(); // Correctly call preventDefault
      console.log('Pass:', passwordValue, " And ", "Confirm:", newPasswordValue,"passwordCode:",passwordResetCode);
  
      try {
          await axios.put(`http://localhost:8080/api/users/${passwordResetCode}/reset-password`, {
              password: passwordValue
          });
          console.log('password has been sent!')
          setIsSuccess(true);
      } catch (error) {
          setIsFailure(true);
          console.error(error);
      }
  };
  
  if (isFailure) return <PasswordResetFail />
  if (isSuccess) return <PasswordResetSuccess />

  

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="../../index2.html" className="h1"><b>Admin</b>LTE</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">You are only one step away from your new password, recover your password now.</p>
                        <form onSubmit={onResetClicked}>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    value={passwordValue}
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                    className="form-control"
                                    placeholder="Password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    value={newPasswordValue}
                                    onChange={(e) => setNewPasswordValue(e.target.value)}
                                    className="form-control"
                                    placeholder="Confirm Password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button
                                        disabled={!passwordValue || !newPasswordValue || passwordValue !== newPasswordValue}
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        Change password
                                    </button>
                                </div>
                            </div>
                        </form>
                        {isSuccess && <p className="mt-3 text-success">Password updated successfully!</p>}
                        {isFailure && <p className="mt-3 text-danger">Failed to update password. Please try again.</p>}
                        <p className="mt-3 mb-1">
                            <a href="/">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecoverPasswordPage;
