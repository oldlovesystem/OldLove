import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from 'components/Breadcrumbs';
import { GridTileImage } from 'components/grid/tile';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  // const { updateSelectedVariantImage } = useProduct();

  // useEffect(() => {
  //   updateSelectedVariantImage(product.featuredImage.url);
  // }, []);

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <Breadcrumbs productName={product.title} />
      <div className="mx-auto max-w-screen-2xl border-neutral-200 bg-white px-4">
        <div className="flex flex-col bg-white p-8 md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full lg:basis-1/2">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
                // product_variants={product.variants}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-1/2">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
      

        <RelatedProducts id={product.id} />
      </div>
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div>
      <h2 className="mb-10 mt-5 max-w-full text-center text-4xl font-thin logofont">Related Products</h2>
      <div className="tab-content">
        {relatedProducts ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {relatedProducts.map((product) => (
              <li key={product.handle} className="relative">
                <Link href={`/product/${product.handle}`} className="relative block h-full w-full">
                  <div className="relative  overflow-hidden  h-[40vh] mt-4 ml-0  md:h-[40vh] w-[90%] lg:h-[50vh]">
                    <GridTileImage
                      alt={product.title}
                      label={{
                        title: product.title,
                        amount: product.priceRange.maxVariantPrice.amount,
                        currencyCode: product.priceRange.maxVariantPrice.currencyCode
                      }}
                      src={product.featuredImage?.url}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
