'use client';

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/cartContext";
import Link from "next/link";

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calculateTotal = () => {
        if (!cartItems || cartItems.length === 0) {
            setTotal(0);
            return;
        }

        const newTotal = cartItems.reduce((sum, item) => {
            const price = typeof item.price === 'number' ? item.price : 0;
            const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
            return sum + (price * quantity);
        }, 0);
        setTotal(newTotal);
        };

        calculateTotal();
    }, [cartItems]);

  
    const handleQuantityChange = (productId, e) => {
      const quantity = parseInt(e.target.value);
      if (quantity > 0) {
        updateQuantity(productId, quantity);
      }
    };

    const calculateNetPrice = (item) => {
        return item.price * item.quantity;
    };
  
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-700">₹{item.price}</p>
                  </div>
                </div>


                <div>
                  <label htmlFor={`quantity-${item.id}`} className="mr-2">
                    Qty:
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="border w-12 text-center"
                    onChange={(e) => handleQuantityChange(item.id, e)}
                  />



                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => removeFromCart(item.id)}
                        >
                        Remove
                    </button>

                    <p className="text-right font-semibold">Net Price: ₹{calculateNetPrice(item)}</p>

                </div>
              </div>
              
            ))}

                <div className="flex justify-end mt-4">
                    <p className="font-bold text-right">Grand Total: ₹{total}</p>
                </div>

                <Link href="/" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                    Proceed to Checkout
                </Link>

          </div>

        )}
      </div>

      

      
    );
  }