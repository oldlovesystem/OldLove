import {Carousel} from 'components/carousel';
import SliderCosmeticOne from 'components/Slider/Slider';
import Collection from 'components/Collection';
import Benefit from 'components/Benefit';
import Instagram from 'components/Instagram';
import SplitSection from 'components/HomePage/SplitSection';

export const metadata = {
  description: "OldLove is a distinguished men's clothing store, curating timeless elegance and sophistication. Each piece is crafted to embody the essence of refined style, catering to the modern gentleman who values quality and heritage in his wardrobe.",
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <SliderCosmeticOne />
      {/* <Collection /> */}
      <SplitSection/>
      <div className="text-center mt-6 logo-font uppercase collectionheading font-thin mb-8">New Arrival</div>
      <Carousel speed={1500} /> 
      <div className="text-center mt-10 logo-font uppercase collectionheading font-thin mb-8">Redefine your Wardrobe</div>
      <Carousel speed={3000} /> 
      <Carousel speed={5000} /> 
      <Carousel speed={7000} />
      <Carousel speed={9000} /> 
      <Carousel speed={2000} /> 
      <Benefit props="md:py-20 py-10" />
      <Instagram />
    </>
  );
}
