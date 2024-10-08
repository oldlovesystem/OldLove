import { Suspense } from 'react';
import { getCollectionProducts, getCollections } from 'lib/shopify';
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

  const productLengths = collectionProducts.map(collection => ({
    title: collection.title,
    productCount: collection.products.length,
  }));

  console.log(productLengths);

  const filteredCollections = collections.filter(collection => collection.title.toLowerCase() !== 'all');

  // Create the filter list with product count for FilterList
  const filterItems = productLengths.map(({ title, productCount }) => ({
    title: title.replace('-', ' '),
    path: `/search/${title}`, // assuming path is in this format
    productCount,
  }));

  return (
    <FilterList list={filterItems} title="Products Type" />
  );
}

export default CollectionList;
