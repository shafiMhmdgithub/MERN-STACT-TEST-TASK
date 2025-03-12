import { useNavigate } from 'react-router-dom';

export const PasswordResetSuccess = () => {
    const navigate = useNavigate();

    return (
        <div class="card">
        <div class="card-body register-card-body">
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Your password has been reset, now please login with your new password.
            </p>
            <button onClick={() => navigate('/')}>Log in</button>
        </div>
        </div>
        </div>
    );
}