'use client';

import { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';

export default function CheckoutPage() {
    const { cartItems } = useContext(CartContext);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formErrors, setFormErrors] = useState({}); // State for form errors

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

    const handleCheckout = () => {
        let errors = {};

        if (!name) {
            errors.name = 'Name is required.';
        }
        if (!address) {
            errors.address = 'Address is required.';
        }
        if (!phoneNumber) {
            errors.phoneNumber = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(phoneNumber)) { // Basic 10-digit phone number validation
            errors.phoneNumber = 'Invalid phone number. Please enter 10 digits.';
        }
        if (!paymentMethod) {
            errors.paymentMethod = 'Payment method is required.';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return; // Stop checkout if there are errors
        }

        // Proceed with checkout if there are no errors
        alert("Checkout Successful!");
        console.log('Name:', name);
        console.log('Address:', address);
        console.log('Phone Number:', phoneNumber);
        console.log('Payment Method:', paymentMethod);
        console.log('Cart Items:', cartItems);
        console.log("Total Amount:", calculateTotal());

        // Reset the cart (optional)
        // localStorage.removeItem('cart');
        // window.location.reload();
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

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
                        <div className="mb-2"> {/* Added wrapper for label and input */}
                            <label htmlFor="name" className="block font-medium mb-1">Name (Required):</label>
                            <input type="text" id="name" className={`border p-2 w-full ${formErrors.name ? 'border-red-500' : ''}`} value={name} onChange={(e) => setName(e.target.value)} />
                            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>} {/* Error message */}
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

                    <button className="bg-blue-500 text-white px-6 py-3 rounded" onClick={handleCheckout}>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
}