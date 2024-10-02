import React from 'react';
import Link from 'next/link';

const HomeHoverContent: React.FC = () => (
  <div className="w-full bg-white shadow-lg p-4 rounded">
    <h3 className="text-lg font-semibold">Home Additional Content</h3>
    <p>This is the content that shows when hovering over Home.</p>
    <Link href="/" className="text-blue-500 underline">
      Go to Home
    </Link>
  </div>
);

export default HomeHoverContent;
