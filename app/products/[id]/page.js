'use client';
import products from "../../../products.json";
import { useContext, useState } from "react";
import { CartContext } from "@/app/context/cartContext";
import { useParams, useRouter } from "next/navigation";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { app } from '@/firebase'; // Path to your Firebase config

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);
  const router = useRouter(); // Initialize useRouter
  const auth = getAuth(app);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const { addToCart } = useContext(CartContext);




  const handleAddToCart =  () => {
    const quantity = parseInt(document.getElementById('quantity').value);

    // Check if user is logged in
    const user = auth.currentUser;
    if (!user) {
      localStorage.setItem('redirectUrl', window.location.href);
      router.push('/auth/SignIn'); // Redirect to sign-in
      return ;
    }
    // User is logged in, add to cart
    addToCart(product, quantity);
  };



 

  return (
    <div className="p-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md h-auto object-cover"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">₹{product.price}</p>
      <p className="mt-4 text-sm text-gray-500">{product.description}</p>

      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-2">Qty:</label>
        <input
          id="quantity"
          type="number"
          min="1"
          defaultValue="1"
          className="border w-12 text-center"
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        // onClick={() => addToCart(product, parseInt(document.getElementById('quantity').value))}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      
    </div>
  );
}
