import { useNavigate } from 'react-router-dom';

 const EmailVerificationFail = () => {
    const navigate = useNavigate();

    return (
        

    <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-10">
            <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                        <h1>Uh oh...</h1>
                        <p>
                            Something went wrong while trying to verify your email.
                        </p>
                        <button onClick={() => navigate('/')}>Back to Sign-up</button>
                </div>
            </div>
        </div>
    </div>
</div>
  
    );
}

export default EmailVerificationFail;