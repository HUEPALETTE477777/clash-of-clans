import { useState, useEffect } from 'react'
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Current user:", currentUser);
        });

        return () => unsubscribe();
    }, []);

    return user;
}

export default useAuth