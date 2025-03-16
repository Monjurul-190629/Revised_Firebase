import React from 'react';
import { useAuth } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        console.log("Logging in with:", email, password);

        try {
            const result = await signIn(email, password);
            console.log("Login successful:", result.user);
            navigate('/');
        } catch (error: any) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <div>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <label className="fieldset-label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" required />
                                <label className="fieldset-label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" required />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
