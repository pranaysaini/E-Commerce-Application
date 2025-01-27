'use client';
import products from "../../../products.json";
import { useContext, useState } from "react";
import { CartContext } from "@/app/context/cartContext";
import { useParams, useRouter } from "next/navigation";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { app } from '@/firebase'; // Path to your Firebase config
import Link from "next/link";

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
  const [showPopup, setShowPopup] = useState(false);




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
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide popup on close button click
  };



 

  return (

    <>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Product added to cart!</p>

            <div>
                <button onClick={handleClosePopup} className="mt-4 bg-gray-200 px-4 py-2 rounded">
                  Close
                </button>

                <Link href="/cart"> {/* Link wraps the button */}
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"> {/* Style as a button */}
                    Go to Cart
                  </button>
                </Link>
            </div>
            
          </div>
        </div>
      )}

        <div className="hidden md:block">
            <div className="p-8 flex justify-center gap-x-20 ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md h-auto object-cover"
              />
              
              <div className="flex flex-col">

                  <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
                  <p className="mt-2 text-2xl">₹{product.price}</p>
                  <p className="mt-4 text-sm text-gray-500">{product.description}</p>

                  <div className="flex items-center mb-4 mt-10">
                    <label htmlFor="quantity" className="mr-2 text-lg font-serif">Quantity</label>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="border w-12 text-center text-xl"
                    />
                  </div>

                  <button
                    className="bg-black hover:bg-white hover:text-black hover:border-solid hover:border-2 hover:border-black text-white border-double font-bold px-4 py-2 mt-1 rounded"
                    // onClick={() => addToCart(product, parseInt(document.getElementById('quantity').value))}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
              </div>
            </div>
        </div>










        <div className="block md:hidden">
            <div className="p-8 flex flex-col justify-center gap-x-20 ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md h-auto object-cover"
              />
              
                <div className="flex flex-col">

                  <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
                  <p className="mt-2 text-2xl">₹{product.price}</p>
                  <p className="mt-4 text-sm text-gray-500">{product.description}</p>

                  <div className="flex items-center mb-4 mt-5">
                    <label htmlFor="quantity" className="mr-2 text-lg font-serif">Quantity</label>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="border w-12 text-center text-xl text-black"
                    />
                  </div>

                  <button
                    className="bg-black hover:bg-white hover:text-black hover:border-solid hover:border-2 hover:border-black text-white border-double font-bold px-4 py-2 mt-1 rounded"
                    // onClick={() => addToCart(product, parseInt(document.getElementById('quantity').value))}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
              </div>

              
            </div>


        </div>
    
    </>

    
    
  );
}
