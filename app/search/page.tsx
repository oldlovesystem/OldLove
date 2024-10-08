import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';
import Link from 'next/link';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

const TwoColumnsIcon = () => (
  <svg className="h-6 w-6 text-gray-400" viewBox="0 0 24 24">
    <rect x="1" y="1" width="10" height="22" className="fill-current" />
    <rect x="13" y="1" width="10" height="22" className="fill-current" />
  </svg>
);

const ThreeColumnsIcon = () => (
  <svg className="h-6 w-6 text-gray-400" viewBox="0 0 24 24">
    <rect x="1" y="1" width="7" height="22" className="fill-current" />
    <rect x="9" y="1" width="7" height="22" className="fill-current" />
    <rect x="17" y="1" width="7" height="22" className="fill-current" />
  </svg>
);

const FourColumnsIcon = () => (
  <svg className="h-6 w-6 text-gray-400" viewBox="0 0 24 24">
    <rect x="1" y="1" width="5" height="22" className="fill-current" />
    <rect x="7" y="1" width="5" height="22" className="fill-current" />
    <rect x="13" y="1" width="5" height="22" className="fill-current" />
    <rect x="19" y="1" width="5" height="22" className="fill-current" />
  </svg>
);

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue, columns = '2' } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      {/* Buttons to change the number of columns using custom icons */}
      <div className="mb-4 flex space-x-2 mt-4 ">
        <Link href={{ pathname: '/search', query: { ...searchParams, columns: '2' } }}>
          <button aria-label="2 Columns" className="p-2 rounded hover:bg-gray-200">
            <TwoColumnsIcon />
          </button>
        </Link>
        <Link href={{ pathname: '/search', query: { ...searchParams, columns: '3' } }}>
          <button aria-label="3 Columns" className="p-2 rounded hover:bg-gray-200">
            <ThreeColumnsIcon />
          </button>
        </Link>
        <Link href={{ pathname: '/search', query: { ...searchParams, columns: '4' } }}>
          <button aria-label="4 Columns" className="p-2 rounded hover:bg-gray-200">
            <FourColumnsIcon />
          </button>
        </Link>
      </div>

      {products.length > 0 ? (
        <Grid className={`grid-cols-${columns} sm:grid-cols-${columns} lg:grid-cols-${columns} py-3 px-3`}>
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
