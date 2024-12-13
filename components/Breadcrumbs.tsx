import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
  productName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName }) => {
  return (
    <nav className="caption1 text-secondary2 bg-gray-100 px-5 py-4 text-gray-700 hover:underline">
      <Link href="/" className="ml-2 text-gray-500 hover:underline">
        Home
      </Link>{' '}
      {' > '}
      <span className="text-sm text-gray-500">Product</span> {' > '}
      <span className="text-sm text-gray-900">{productName}</span>
    </nav>
  );
};

export default Breadcrumbs;
