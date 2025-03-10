'use client';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app, auth, db } from '@/firebase'; // Import your Firebase config
import { addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { CartContext } from '../context/cartContext';


const Profile = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const auth = getAuth(app);

    const [orders, setOrders] = useState([]);

    const fetchOrders = async (userId) => {
        try {
          const ordersCollection = collection(db, 'orders');
          const q = query(ordersCollection, where('userId', '==', userId));
          const querySnapshot = await getDocs(q);
          const fetchedOrders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchedOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);

            if (user) {
                // Fetch orders when user signs in
                fetchOrders(user.uid);
              } else {
                setOrders([]); // Clear orders when user signs out
              }
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

        <>
            <div className='hidden md:block'>
                    <div className='flex flex-col w-full justify-center items-center'>
                    {/* <h1 className='mt-10 ml-10 text-3xl font-bold'>Profile</h1> */}
                    <p className='mt-10 ml-10 text-5xl font-extrabold bg-gradient-to-r from-slate-900 via-orange-500 to-slate-50 bg-clip-text text-transparent leading-normal'>{user.email}</p>
                    <h2 className='mt-12 ml-10 text-3xl font-semibold'>Order History</h2>
                    {orders.length > 0 ? (
                        <ul className='grid grid-cols-4 mt-6 '>
                            {orders.map((order) => (
                                <li key={order.id} className={`text-white font-semibold bg-gradient-to-r from-stone-500 to-stone-700 rounded-lg p-4 mb-5 ${order%4 === 0 ? '' : 'ml-5'} ${order%3 === 0 ? '' : 'mr-5'}`}>
                                <p>Order ID: {order.id}</p>
                                {/* Check for `orderDate` existence and validity before calling toDate() */}
                                {order.orderDate && order.orderDate.toDate && (
                                    <p>Order Date: {order.orderDate.toDate().toLocaleString()}</p>
                                )}
                                <p>Order Total: ₹{order.totalAmount.toFixed(2)}</p> {/* Format total to 2 decimal places */}
                                <p>Status: {order.status}</p>
                                {/* Optionally display additional order details based on your data structure */}
                                {order.items && (
                                    <div>
                                        <h4>Order Items:</h4>
                                        <ul>
                                            {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.name} (Quantity: {item.quantity})
                                            </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p>You don't have any orders yet.</p>
                    )}
                    <button onClick={handleSignOut} className='mt-10 bg-blue-600 hover:bg-blue-300 hover:text-black rounded text-white h-10 w-40'>Sign Out</button>
                </div>


            </div>









            <div className='block md:hidden'>
                    <div className='flex flex-col justify-center items-center'>
                            <button onClick={handleSignOut} className='mt-10 mr-auto bg-blue-600 hover:bg-blue-300 hover:text-black rounded text-white h-10 w-40'>Sign Out</button>
                    {/* <h1 className='mt-10 ml-10 text-3xl font-bold'>Profile</h1> */}
                            <p className='mt-10 ml-10 text-3xl font-extrabold bg-gradient-to-r from-slate-900 via-orange-500 to-slate-50 bg-clip-text text-transparent leading-normal'>{user.email}</p>
                            <h2 className='mt-12 ml-10 text-3xl font-semibold'>Order History</h2>
                            {orders.length > 0 ? (
                                <ul className='grid grid-cols-1 mt-6 '>
                                    {orders.map((order) => (
                                        <li key={order.id} className={`text-white font-semibold bg-gradient-to-r from-stone-500 to-stone-700 rounded-lg p-4 mb-5 ${order%4 === 0 ? '' : 'ml-5'} ${order%3 === 0 ? '' : 'mr-5'}`}>
                                        <p>Order ID: {order.id}</p>
                                        {/* Check for `orderDate` existence and validity before calling toDate() */}
                                        {order.orderDate && order.orderDate.toDate && (
                                            <p>Order Date: {order.orderDate.toDate().toLocaleString()}</p>
                                        )}
                                        <p>Order Total: ₹{order.totalAmount.toFixed(2)}</p> {/* Format total to 2 decimal places */}
                                        <p>Status: {order.status}</p>
                                        {/* Optionally display additional order details based on your data structure */}
                                        {order.items && (
                                            <div>
                                                <h4>Order Items:</h4>
                                                <ul>
                                                    {order.items.map((item, index) => (
                                                    <li key={index}>
                                                        {item.name} (Quantity: {item.quantity})
                                                    </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p>You don't have any orders yet.</p>
                            )}
                    
                </div>


            </div>
        
        
        </>
        
    );
};

export default Profile;