import React, { useState } from 'react';
import { signup } from '../firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    const signup_handle = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
            navigate('/'); 
            alert('Signup successful!');
        } catch (err) {
            setError(err.message);
        }
    };

    const google_signup_handle = async (e) => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/'); 
        } catch (error) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white">
                <h2 className="text-2xl font-semibold mb-6 text-center">Create an Account!</h2>
                <form onSubmit={signup_handle} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                            required
                            className="w-full p-3 border border-gray-300"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                            required
                            className="w-full p-3 border border-gray-300"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-primary-light text-white"> Sign Up! </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                <div className="mt-4">
                    <button
                        onClick={google_signup_handle}
                        className="w-1/2 py-3 bg-primary-light text-white font-semibold"
                    >
                        Sign Up with Google
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Signup;
