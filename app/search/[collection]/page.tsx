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
      <div className='bg-white min-h-screen ml-5 lg:ml-14'>

        {products.length === 0 ? (
          <p className="py-3 text-lg">{`No products found${searchValue ? ` for "${searchValue}"` : ''} in this collection`}</p>
        ) : (
          <div className=''>
          <Grid className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 ml-2 mr-2 `}>
            <ProductGridItems products={products} />
          </Grid>
          </div>
        )}
      </div>
    </section>
  );
}
