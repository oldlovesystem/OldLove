import clsx from 'clsx';
import { Suspense } from 'react';

import { getCollections } from 'lib/shopify';
import FilterList from './filter';

async function CollectionList() {
  const collections = await getCollections();
  return <FilterList list={collections} title="Collections" />;
}

const skeleton = 'mb-3 h-4 w-full animate-pulse rounded';
const activeAndTitles = 'bg-white text-black'; // Set background to white and text to black
const items = 'bg-gray-200 text-black'; // Use a light gray for items with black text

export default function Collections() {
  return (
    <div className="bg-white text-black w-full "> {/* Full width and height */}
      <Suspense
        fallback={
          <div className="col-span-2 hidden h-[400px] w-full flex-none lg:block">
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
