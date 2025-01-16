import Navbar from "../components/Navbar";
import products from "../products.json";
import { CartContext } from "@/app/context/cartContext";
import ProductCard from "@/components/ProductCard";


export default function ProductList() {
  return (

    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

    </>
  );
}
