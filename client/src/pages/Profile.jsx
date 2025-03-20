
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { logout } from '../firebase/auth'; 
import PostForm from '../components/PostForm';

const Profile = () => {
    const { user } = useAuth();


    if (!user) {
        return <p>You must be logged in to view this page.</p>;
    }

    return (
        <div>
            <img src={user.photoURL} />
            <p>Display Name: <span className="font-semibold text-2xl">{user.displayName}</span> </p>
            <p>Email: {user.email}</p>
            <p>Access Token: <span className="font-light">{user.accessToken}</span></p>
            <button onClick={logout} className="bg-primary-light p-4 text-white">Logout</button>
            <PostForm />
        </div>
    );
};

export default Profile;
