// components/Breadcrumbs.js
import Link from 'next/link';

const Breadcrumbs = ({ collectionName }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex space-x-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        {collectionName && (
          <>
            <li>/</li>
            <li>
              <Link href={`/collections/${collectionName.toLowerCase()}`}>
                {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
              </Link>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
