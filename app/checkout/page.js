'use client';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/cartContext';
import { addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { app, db } from '@/firebase'; // Import Firebase config
import {auth} from '@/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';


export default function CheckoutPage() {
    const { cartItems, clearCart } = useContext(CartContext); // Destructure clearCart
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (!currentUser) {
            alert("Please sign in to place your order.");
          }
        });
        return () => unsubscribe();
    }, []);

    const calculateTotal = () => {
        if (!cartItems || cartItems.length === 0) {
            return 0;
        }

        return cartItems.reduce((sum, item) => {
            const price = typeof item.price === 'number' ? item.price : 0;
            const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
            return sum + (price * quantity);
        }, 0);
    };


    const fetchOrders = async (userId) => {
        try {
          const ordersCollection = collection(db, 'orders'); // Use db here
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

    const handleCheckout = async () => {
        let errors = {};

        if (!name) errors.name = 'Name is required.';
        if (!address) errors.address = 'Address is required.';
        if (!phoneNumber) errors.phoneNumber = 'Phone number is required.';
        else if (!/^\d{10}$/.test(phoneNumber)) errors.phoneNumber = 'Invalid phone number (10 digits).';
        if (!paymentMethod) errors.paymentMethod = 'Payment method is required.';

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        // const auth = getAuth(app);
        const user = auth.currentUser;

        if (!user) {
            alert('Please sign in to place your order.'); // Alert the user to sign in
            return;
        }

        try {
            const ordersCollection = collection(db, 'orders');
            const orderData = {
                userId: user.uid,
                items: cartItems.map(item => ({ // Correctly format items
                    productId: item.id, // Assuming your cart items have an 'id'
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: calculateTotal(),
                shippingAddress: { name, address, phoneNumber },
                orderDate: serverTimestamp(),
                status: 'pending',
                paymentMethod,
            };    
                   
            const newOrderRef = await addDoc(ordersCollection, orderData);
            console.log('Order placed successfully:', newOrderRef.id);
            alert('Checkout Successful! Your order ID is: ' + newOrderRef.id);

            clearCart // Clear the cart after successful order
            setName(''); // Clear form inputs
            setAddress('');
            setPhoneNumber('');
            setPaymentMethod('');
            setFormErrors({}); // Clear any previous errors

        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing your order. Please try again.');
        }
    };

    return (
        <div className="p-8">
            {/* <h1 className="text-2xl font-bold mb-4">Checkout</h1> */}

            {cartItems.length === 0 ? (
                <p>Your cart is empty. Add items to proceed to checkout.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="border p-4 mb-4">
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ₹{item.price}</p>
                            
                        </div>
                    ))}
                    <p className="text-xl font-semibold mt-4">Total: ₹{calculateTotal()}</p>

                    <div className="mt-4">
                        <div className="mb-2">
                            <label htmlFor="name" className="block font-medium mb-1">Name (Required):</label>
                            <input type="text" id="name" className={`border p-2 w-full ${formErrors.name ? 'border-red-500' : ''}`} value={name} onChange={(e) => setName(e.target.value)} />
                            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                        </div>

                        <div className="mb-2">
                            <label htmlFor="address" className="block font-medium mb-1">Address (Required):</label>
                            <textarea id="address" className={`border p-2 w-full ${formErrors.address ? 'border-red-500' : ''}`} value={address} onChange={(e) => setAddress(e.target.value)} />
                            {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                        </div>

                        <div className="mb-2">
                            <label htmlFor="phoneNumber" className="block font-medium mb-1">Phone Number (Required):</label>
                            <input type="tel" id="phoneNumber" className={`border p-2 w-full ${formErrors.phoneNumber ? 'border-red-500' : ''}`} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            {formErrors.phoneNumber && <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="paymentMethod" className="block font-medium mb-1">Payment Method (Required):</label>
                            <select id="paymentMethod" className={`border p-2 w-full ${formErrors.paymentMethod ? 'border-red-500' : ''}`} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <option value="">Select Payment Method</option>
                                <option value="COD">COD</option>
                                <option value="UPI">UPI</option>
                            </select>
                            {formErrors.paymentMethod && <p className="text-red-500 text-sm">{formErrors.paymentMethod}</p>}
                        </div>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded " onClick={handleCheckout}>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
}