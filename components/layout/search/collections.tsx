import clsx from 'clsx';
import { Suspense } from 'react';
import { getCollectionProducts  , getCollections} from 'lib/shopify';
import FilterList from './filter';

async function CollectionList() {
  const collections = await getCollections();
  const titles = collections
    .slice(1) 
    .map(collection => collection.title.toLowerCase().replace(/\s+/g, '-'));

  const collectionProducts = await Promise.all(
    titles.map(async (title) => {
      const products = await getCollectionProducts({ collection: title });
      return { title, products };
    })
  );

  console.log(collectionProducts);

  // Get lengths of products for each collection
  const productLengths = collectionProducts.map(collection => ({
    title: collection.title,
    productCount: collection.products.length,
  }));

  console.log(productLengths);

  const filteredCollections = collections.filter(collection => collection.title.toLowerCase() !== 'all');



  

  return <FilterList list={filteredCollections} title="Product Type" />;
}

const skeleton = 'mb-3 h-4 w-full animate-pulse rounded';
const activeAndTitles = 'bg-white text-black'; 
const items = 'text-black  ';

export default function Collections() {
  return (
    <div className="bg-white text-black w-full  "> {/* Full width and height */}
      <Suspense
        fallback={
          <div className="col-span-2 hidden h-[400px] w-full flex-none lg:block ">
            <div className={clsx(skeleton, activeAndTitles)} />
            <div className={clsx(skeleton, activeAndTitles)} />
            <div className={clsx(skeleton, items)} />
            <div className={clsx(skeleton, items)} />
            <div className={clsx(skeleton, items)} />
            <div className={clsx(skeleton, items)} />
            <div className={clsx(skeleton, items)} />
            <div className={clsx(skeleton, items)} />
            <div className={clsx(skeleton, items)} />
            <div className={clsx(skeleton, items)} />
          </div>
        }
      >
        <CollectionList />
      </Suspense>
    </div>
  );
}
