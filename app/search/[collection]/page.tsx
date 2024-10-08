import { getCollection, getCollectionProducts, getProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

const TwoColumnsIcon = () => (
  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24">
    <rect x="1" y="1" width="10" height="22" className="fill-current" />
    <rect x="13" y="1" width="10" height="22" className="fill-current" />
  </svg>
);

const ThreeColumnsIcon = () => (
  <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24">
    <rect x="1" y="1" width="7" height="22" className="fill-current" />
    <rect x="9" y="1" width="7" height="22" className="fill-current" />
    <rect x="17" y="1" width="7" height="22" className="fill-current" />
  </svg>
);



export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const collection = await getCollection(params.collection);
  const { sort, columns = '2', q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = searchValue 
    ? await getProducts({ sortKey, reverse, query: searchValue }) 
    : await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  // Check if collection is found
  if (!collection) {
    return <p className="py-3 text-lg">{`Collection not found`}</p>;
  }

  return (
    <section>
      <div className='bg-white min-h-screen'>
        {/* Buttons to change the number of columns using custom icons */}
        <div className="mb-4 flex space-x-2 ml-5">
          <Link href={{ pathname: `/search//${params.collection}`, query: { ...searchParams, columns: '2' } }}>
            <button aria-label="2 Columns" className="p-2 rounded hover:bg-gray-200">
              <TwoColumnsIcon />
            </button>
          </Link>
          <Link href={{ pathname: `/search/${params.collection}`, query: { ...searchParams, columns: '3' } }}>
            <button aria-label="3 Columns" className="p-2 rounded hover:bg-gray-200">
              <ThreeColumnsIcon />
            </button>
          </Link>
        
        </div>

        {products.length === 0 ? (
          <p className="py-3 text-lg">{`No products found${searchValue ? ` for "${searchValue}"` : ''} in this collection`}</p>
        ) : (
          <Grid className={`grid-cols-${columns} sm:grid-cols-${columns} lg:grid-cols-${columns}`}>
            <ProductGridItems products={products} />
          </Grid>
        )}
      </div>
    </section>
  );
}
