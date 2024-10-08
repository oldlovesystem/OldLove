import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
  productName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName }) => {
  return (
    <nav className=" caption1 text-secondary2 hover:underline text-gray-700 bg-gray-100 py-4 px-5">
      <Link href="/" className="ml-2 text-gray-500 hover:underline">Home</Link> {' > '}
      <span className="text-gray-500 text-sm ">Product</span> {' > '}
      <span className="text-gray-900 text-sm">{productName}</span>
    </nav>
  );
};

export default Breadcrumbs;
