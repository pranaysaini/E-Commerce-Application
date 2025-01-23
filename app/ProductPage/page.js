import products from "../../products.json";
import ProductCard from "@/components/ProductCard";
import { CartContext } from "@/app/context/cartContext";

export default function ProductPage() {
  return (

    <>
      <div className="grid grid-cols-4 space-x-4 space-y-4 mt-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

    </>
  );
}
