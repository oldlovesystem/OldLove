import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import SliderCosmeticOne from 'components/Slider/Slider';
import Collection from 'components/Collection';
import WhatNewOne from 'components/WhatNewOne';
import Footer from 'components/layout/footer';
import Benefit from 'components/Benefit';
import testimonialData from './Testimonial.json'
import Testimonial from 'components/Testimonial';
import Instagram from 'components/Instagram';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <SliderCosmeticOne/>
      <div>
        HI
      </div>
      <WhatNewOne start={0} limit={4} />
      <Collection/>
      <Benefit props="md:py-20 py-10" />
      <Testimonial data={testimonialData} limit={6} />
      <Instagram/>
      <Carousel />
      <Footer />
    </>
  );
}
