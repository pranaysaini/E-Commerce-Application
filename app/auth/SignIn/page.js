'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase';// Import your Firebase config

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const auth = getAuth(app);
    const searchParams = useSearchParams();



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const redirectUrl = searchParams.get('redirectUrl') || '/'; // Default to home if no redirect URL
            localStorage.removeItem('redirectUrl'); // Clear the stored URL
            router.push(redirectUrl || '/profile');
          }
        });
    
        return () => unsubscribe();
      }, [auth, router, searchParams]);


   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // router.push('/profile'); // Redirect to profile after successful login
        } catch (err) {
            setError(err.message);
            console.error("Error signing in:", err)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;
