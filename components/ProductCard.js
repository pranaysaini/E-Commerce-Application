import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} >

      
      <div className="p-4 mt-10 cursor-pointer hover:shadow-xl h-4/5">
            <img    
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg font-bold mt-2 text-center">{product.name}</h3>
                <p className="text-md mt-2">₹{product.price}</p>
            </div>
      
      
        
      </div>
    </Link>
  );
}