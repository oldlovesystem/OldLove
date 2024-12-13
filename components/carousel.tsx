import { getCollectionProducts, getCollections } from 'lib/shopify';
import TabSwitcher from './TabSwitcher';

export async function Carousel({ speed }) {
  // Fetch collections excluding the 'All' collection
  const collections = await getCollections();
  const filteredCollections = collections.filter(
    (collection) => collection.title.toLowerCase() !== 'all'
  );

  // Fetch all products from each filtered collection
  const allProducts = await Promise.all(
    filteredCollections.map(async (collection) => {
      const products = await getCollectionProducts({
        collection: collection.title.toLowerCase().replace(/\s+/g, '-')
      });
      return products; // Return products directly
    })
  );

  // Flatten the array of products
  const combinedProducts = allProducts.flat();
  console.log(combinedProducts.length);

  // Shuffle the combined products array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledProducts = shuffleArray(combinedProducts).slice(0, 10);
  console.log(shuffledProducts.length);

  return (
    <div>
      <TabSwitcher products={shuffledProducts} speed={speed} />
    </div>
  );
}
