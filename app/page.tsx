import { Carousel } from 'components/carousel';
import SliderCosmeticOne from 'components/Slider/Slider';
import Benefit from 'components/Benefit';
import SliderOne from 'components/HomePage/Slider';
import Link from 'next/link';
import Instagram from 'components/Instagram';
import NewArrivalSlider from 'components/HomePage/NewArrivalSlider';
import Slider from 'components/HomePage/Section';
import Slider1 from 'components/HomePage/FooterSlider';
import NewsletterSection from 'components/HomePage/Newletter';

export const metadata = {
  description:
    "OldLove is a distinguished men's clothing store, curating timeless elegance and sophistication. Each piece is crafted to embody the essence of refined style, catering to the modern gentleman who values quality and heritage in his wardrobe.",
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <SliderCosmeticOne />
      {/* <Benefit props="md:py-10 " /> */}
      {/* <SplitSection /> */}
      <div className="logo-font mt-6 text-center text-sm font-thin uppercase">Catch The Trend</div>
      <div className="logo-font mb-4 text-center text-xl font-thin uppercase">
        Shop our Best Seller
      </div>
      <Carousel speed={1500} />
      <Carousel speed={3000} />
      <button className="mx-auto mb-4 mt-2 block bg-gray-900 px-10 py-3 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white md:mt-4">
        <Link href="/search/">View All</Link>
      </button>
      <hr className="my-5 border-t-2 border-gray-300" />
      <div className="logo-font mb-4 text-center text-xl uppercase">Shop By Category</div>
      <Instagram />
      <img src="/Shacket.jpg" />

      <div className="logo-font mb-4 mt-4 px-4 font-bold uppercase">Latest Arrivals</div>

      <Carousel speed={5000} />
      <button className="mx-auto mb-2 mt-2 block bg-gray-900 px-10 py-3 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white md:mt-4">
        <Link href="/search/">View All</Link>
      </button>
      <div className="mt-2">
        <Slider />
      </div>
      <div className="logo-font mb-4 mt-4 px-4 font-bold uppercase">You May Also Like</div>
      <Carousel speed={7000} />
      <div className="mb-2 mt-2"></div>
      <div className="mt-2">
        <Slider1 />
      </div>
      <NewsletterSection />
      <div className="mb-2 mt-2"></div>
      {/* <Slider /> */}
    </>
  );
}
