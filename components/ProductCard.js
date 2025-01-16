import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} >
      <div className="border p-4 cursor-pointer hover:shadow-md">
        <img    
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <h3 className="text-lg font-bold mt-2">{product.name}</h3>
        <p className="text-gray-700">₹{product.price}</p>
      </div>
    </Link>
  );
}