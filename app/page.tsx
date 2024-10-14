import { Carousel } from 'components/carousel';
import SliderCosmeticOne from 'components/Slider/Slider';
import Collection from 'components/Collection';
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
      <Collection/>
      <Carousel />
      <Benefit props="md:py-20 py-10" />
      <Instagram/>
     
    </>
  );
}
