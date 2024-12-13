import { getCollection, getCollectionProducts, getProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  if (!collection) {
    return <p className="py-3 text-lg">{`Collection not found`}</p>;
  }

  return (
    <section>
      <div className="ml-5 min-h-screen bg-white lg:ml-14">
        {products.length === 0 ? (
          <p className="py-3 text-lg">{`No products found${searchValue ? ` for "${searchValue}"` : ''} in this collection`}</p>
        ) : (
          <div className="">
            <ProductGridItems products={products} />
          </div>
        )}
      </div>
    </section>
  );
}
