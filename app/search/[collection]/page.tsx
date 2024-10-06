import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
  const collection = await getCollection(params.collection); // Fetch the collection data
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  // Check if collection is found
  if (!collection) {
    return <p className="py-3 text-lg">{`Collection not found`}</p>;
  }

  return (
    <section>
      <div className=''> 
  <div className='text-center py-20 mb-4 relative hidden sm:block'> {/* Hide in mobile view */}
    <h1 className="text-3xl sm:text-4xl font-bold -translate-x-4 sm:-translate-x-20"> {/* Adjusted size and translate */}
      {collection.title}
    </h1>
    <p className="mt-2 -translate-x-4 sm:-translate-x-20"> {/* Adjusted translate */}
      <a href="/" className="hover:underline">Home</a> &gt;<span className='text-gray-400'> {collection.title} </span>
    </p>
  </div>
</div>

      <div className='bg-white min-h-screen'> {/* Changed to min-h-screen to allow for better viewing on small screens */}
        {products.length === 0 ? (
          <p className="py-3 text-lg">{`No products found in this collection`}</p>
        ) : (
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </Grid>
        )}
      </div>
    </section>
  );
}
