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
        <div>
            <h1>Profile</h1>
            <p>Email: {user.email}</p>
            <h2>Order History</h2>
            {orders.length > 0 ? (
                <ul>
                {orders.map((order) => (
                    <li key={order.id}>
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
                                {order.items.map((item) => (
                                <li key={item.id}>
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
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Profile;