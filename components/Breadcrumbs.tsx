import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
  productName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName }) => {
  return (
    <nav className=" text-sm text-gray-700 bg-white py-4 px-5">
      <Link href="/" className="ml-2">Home</Link> {' > '}
      <span className="text-gray-500 text-sm">Product</span> {' > '}
      <span className="text-gray-500 text-sm">{productName}</span>
    </nav>
  );
};

export default Breadcrumbs;
