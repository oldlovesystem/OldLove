import { Carousel } from 'components/carousel';
import SliderCosmeticOne from 'components/Slider/Slider';
import Collection from 'components/Collection';
import Benefit from 'components/Benefit';
import testimonialData from './Testimonial.json'
import Testimonial from 'components/Testimonial';
import Instagram from 'components/Instagram';

export const metadata = {
  description: "OldLove is a distinguished men's clothing store, curating timeless elegance and sophistication. Each piece is crafted to embody the essence of refined style, catering to the modern gentleman who values quality and heritage in his wardrobe.",
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <SliderCosmeticOne/>
      <Collection/>
      <div className="text-center mt-10  logo-font uppercase collectionheading font-thin mb-8">Redefine your Wardrobe</div>
      <Carousel />
      <Carousel />
      <Carousel />
      <Carousel />
      <Benefit props="md:py-20 py-10" />
      <Instagram/>
     
    </>
  );
}
