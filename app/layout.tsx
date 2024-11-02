// Your existing RootLayout component
import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import TopNavOne from 'components/layout/navbar/TopNavOne';
import Footer from 'components/layout/footer';
import { Toaster } from 'sonner';
import PostShipLoader from './PostShipLoader';
import WhatsAppIcon from 'components/WhatsAppIcon'; // Import the WhatsAppIcon component
import './styles/styles.scss';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = cookies().get('cartId')?.value;
  const cart = getCart(cartId);

  return (
    <html lang="en" className={GeistSans.variable}>
    <body className="bg-white text-black selection:bg-teal-300">
      <CartProvider cartPromise={cart}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <TopNavOne props="style-one bg-black" slogan="Celebrate in Style: Enjoy 10% Off This Festive Season! Use code 'NEW10'"/>
          <Navbar />
        </div>
        <main className="pt-[110px] md:pt-[120px]"> {/* Adjust the padding to fit the fixed components */}
          {children}
          <Toaster closeButton />
        </main>
        <Footer />
      </CartProvider>
      <PostShipLoader />
    </body>
    
  </html>
  );
}
