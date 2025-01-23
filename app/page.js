import products from "../products.json";
import { CartContext } from "@/app/context/cartContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function ProductList() {
  return (

    <>

      <Link href='./ProductPage' >
          <div>
            <div>
                <img src="/assets/Banners/Banner1/Banner1.webp"  alt="sale" className="mx-auto"/>
                <div className="flex justify-center items-center gap-x-3 mt-5"> 
                  <img src="/assets/Banners/Banner1/B11.avif" />
                  <img src="/assets/Banners/Banner1/B12.avif" />
                  <img src="/assets/Banners/Banner1/B13.avif"  />
                  <img src="/assets/Banners/Banner1/B14.avif"  />
                </div>
            </div>

            <div>
                <img src="/assets/Banners/Banner2/Banner2.avif"  alt="sale" className="mx-auto mt-10"/>
                <img src="/assets/Banners/Banner2/western.avif" />
                
                <div className="flex justify-center items-center gap-x-3 mt-5"> 
                  <img src="/assets/Banners/Banner2/B21.avif" />
                  <img src="/assets/Banners/Banner2/B22.webp" />
                  <img src="/assets/Banners/Banner2/B23.webp" />
                  <img src="/assets/Banners/Banner2/B24.webp" />
                </div>
            </div>

            
            <div>
                <img src="/assets/Banners/payment.webp" className="mx-auto mt-10" />

                <img src="/assets/Banners/Banner3/winter.avif" className="mt-10 mx-auto" />

                <div className="flex justify-center items-center"> 
                  <img src="/assets/Banners/Banner3/B31.avif" />
                  <img src="/assets/Banners/Banner3/B32.avif" />
                  <img src="/assets/Banners/Banner3/B33.avif" />
                  <img src="/assets/Banners/Banner3/B34.avif" />
                </div>
            </div>
          </div>
      </Link>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

    </>
  );
}
