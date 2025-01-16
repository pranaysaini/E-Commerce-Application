import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">

        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/cart">Cart</Link></li>
        <li><Link href="/account">Account</Link></li>
        
        
      </ul>
    </nav>
  );
}
