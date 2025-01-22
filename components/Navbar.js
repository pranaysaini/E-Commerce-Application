'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase'; // Path to your Firebase config
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Clean up the listener
    }, [auth]);

    const handleCartClick = (e) => {
        if (!user) {
            e.preventDefault(); // Prevent default link behavior
            router.push('/auth/SignIn'); // Redirect to sign-in
        } 
    };

    return (
        <nav className="p-4 text-indigo-900 font-semibold text-lg">
            <ul className="flex justify-center items-center">
                <li className="mr-auto hover:underline"><Link href="/products">Products</Link></li>
                <li><Link href="/"> <img src="/assets/logo.png" className='h-14' /></Link></li>
                
                <div className='ml-auto flex space-x-4'>
                    <li><Link href="/cart" onClick={handleCartClick} className='hover:underline'>Cart</Link></li>

                    {user ? ( // User is logged in
                        <>
                            <li className='hover:underline'><Link href="/profile">Profile</Link></li>
                            {/* If you still want an "Account" link with more options: */}
                            {/* <li><Link href="/account">Account</Link></li> */}
                        </>
                    ) : ( // User is not logged in
                        <>
                            <li className='hover:underline'><Link href="/auth/SignIn">Sign In</Link></li>
                            <li className='hover:underline'><Link href="/auth/SignUp">Sign Up</Link></li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    );
}