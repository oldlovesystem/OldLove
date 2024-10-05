import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ShopHoverContent: React.FC = () => (
  <div className="w-full bg-linear shadow-lg p-4 rounded"> 
    <div className="grid grid-cols-4 gap-4 mt-4">
      <div>
      <h4 className="font-semibold uppercase text-center">Top Wear</h4>
        <ul className="pl-5 text-center text-gray-500 mt-2">
          <Link href={'/search/printed-shirts'}>
          <li className="mb-2">Printed Shirts</li>
          </Link>
          <Link href={"/search/casual-shirtsh"}>
          <li className="mb-2">Casual Shirts</li>
          </Link>
          <Link href={'/search/check-shirts'}>
          <li className="mb-2">Checks Shirts</li>
          </Link>
          <li className="ml-2 mb-2">Mandarin Shirts</li>
        </ul>
      </div>

      {/* Column 2: Bottom Wear */}
      <div>
        <h4 className="font-semibold uppercase text-center">Bottom Wear</h4>
        <ul className=" pl-5 text-gray-500 mt-2 text-center">
          <li className="mb-2">Classic Jeans Wear</li>
          <li className="mb-2"> Trendy Cargos Wear</li>
        </ul>
      </div>

      {/* Column 3: Recent Products */}
      <div>
        <h4 className="font-semibold">Recent Products</h4>
        <Image 
          src="/4M6A2498.JPG" 
          alt="Top Wear 1" 
          width={250} 
          height={200} 
          className="mb-2"
        />
      </div>

      {/* Column 4: Recent Products */}
      <div>
      <h4 className="font-semibold text-white">Recent Products</h4>
        <Image 
          src="/IMG_0012.JPG" 
          alt="Bottom Wear 1" 
          width={250} 
          height={200} 
          className="mb-2"
        />
      </div>
    </div>
  </div>
);

export default ShopHoverContent;
