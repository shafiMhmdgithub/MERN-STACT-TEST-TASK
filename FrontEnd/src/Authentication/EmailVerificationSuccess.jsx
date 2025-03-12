import React from 'react'
import { useNavigate } from 'react-router-dom';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  return (


    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card card-primary card-outline">
            <div className="card-body box-profile">
              <h1>Success!</h1>
              <p>
                Thanks for verifying your email, now you can use all the app's features.
              </p>
              <button onClick={() => navigate('/')}>Go to home page</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EmailVerificationSuccess;