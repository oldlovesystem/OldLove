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
          <TopNavOne props="style-one bg-black" slogan="Welcome to Old Love"/>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WhatsAppIcon /> {/* Include the WhatsAppIcon here */}
          </main>
          <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}
