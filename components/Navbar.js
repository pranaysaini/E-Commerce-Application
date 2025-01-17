'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase'; // Path to your Firebase config

export default function Navbar() {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Clean up the listener
    }, [auth]);

    return (
        <nav className="p-4 bg-gray-800 text-white">
            <ul className="flex space-x-4">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/cart">Cart</Link></li>

                {user ? ( // User is logged in
                    <>
                        <li><Link href="/profile">Profile</Link></li>
                        {/* If you still want an "Account" link with more options: */}
                        {/* <li><Link href="/account">Account</Link></li> */}
                    </>
                ) : ( // User is not logged in
                    <>
                        <li><Link href="/auth/SignIn">Sign In</Link></li>
                        <li><Link href="/auth/SignUp">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}