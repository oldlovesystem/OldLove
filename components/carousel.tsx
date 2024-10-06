import { getCollectionProducts  , getCollections} from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';
import TabSwitcher from './TabSwitcher';

export async function Carousel() {
  
  const products = await getCollectionProducts({ collection: 'check-shirts' });
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


  console.log(titles);
  console.log(collectionProducts)
  if (!products?.length) return null;

  
  return (
    <div>
      <TabSwitcher collectionProducts={collectionProducts} />
    </div>
  );
}