'use client';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app, auth } from '@/firebase';  // Import your Firebase config

const Profile = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [auth]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/'); // Redirect to home or login page after sign out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!user) {
        return <div>Loading or not logged in...</div>; // Or redirect to login
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {user.email}</p>
            {/* Add order history display here (see previous response) */}
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Profile;