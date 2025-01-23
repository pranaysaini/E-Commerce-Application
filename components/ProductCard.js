import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} >

      
      <div className="border p-4 cursor-pointer hover:shadow-xl">
            <img    
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                <p className="text-gray-700">₹{product.price}</p>
            </div>
      
      
        
      </div>
    </Link>
  );
}