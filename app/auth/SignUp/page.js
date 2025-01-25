'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase'; // Import your Firebase config
import Link from 'next/link';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const auth = getAuth(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/profile'); // Redirect to profile after successful registration
        } catch (err) {
            setError(err.message);
            console.error("Error signing up:", err)
        }
    };

    return (

        <>

            <div className='hidden md:block'>

                    <div className='flex jystify-center items center mx-auto ml-96'>

                        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center mt-20 bg-indigo-200 py-20 rounded-xl'>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                                    className='border border-black h-12 w-96 mb-5 p-3 rounded-xl' />


                            <input type="password" placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                    className='border border-black h-12 w-96 mb-5 p-3 rounded-xl' />

                            <button type="submit" className="w-40 h-10 bg-blue-600 hover:bg-blue-500 mt-5 rounded-lg text-white">Sign Up</button>

                            <Link href="/auth/SignUp" 
                                className="ml-96 mt-12 text-blue-700 hover:text-blue-500 hover:underline mr-8">Already Have an Account? Sign In</Link>
                        </form>

                    </div>
            </div>









            <div className='bock md:hidden'>

                    <div className='flex jystify-center items center bg-indigo-200 h-screen'>

                        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center mt-20 bg-indigo-200 mb-auto py-20 rounded-xl ml-5 '>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                                    className='border border-black h-12 w-96 mb-5 p-3 rounded-xl' />


                            <input type="password" placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                    className='border border-black h-12 w-96 mb-5 p-3 rounded-xl' />

                            <button type="submit" className="w-40 h-10 bg-blue-600 hover:bg-blue-500 mt-5 rounded-lg text-white">Sign Up</button>

                            <Link href="/auth/SignIn" 
                                className="mt-12 text-blue-700 hover:text-blue-500 hover:underline mr-8">Already Have an Account? Sign In</Link>
                        </form>

                    </div>
            </div>
            
        
        
        </>

        
        
    );
};

export default SignUp;
