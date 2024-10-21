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



      {products.length > 0 ? (
        <Grid className={`grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:ml-14 ml-2 `}>
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
