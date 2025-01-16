import {Carousel} from 'components/carousel';
import SliderCosmeticOne from 'components/Slider/Slider';
import Benefit from 'components/Benefit';
import SplitSection from 'components/HomePage/SplitSection';
import SliderOne from 'components/HomePage/Slider';
import NewArrivalSlider from 'components/HomePage/NewArrivalSlider';
import Slider from 'components/HomePage/FooterSlider';
import NewsletterSection from 'components/HomePage/Newletter';

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
      <Benefit props="md:py-10 " />
      <SplitSection/>
      <div className="text-center mt-6 logo-font uppercase collectionheading font-thin mb-4">Trending Now</div>
      <Carousel speed={1500} /> 
      <Carousel speed={3000} /> 
      <NewArrivalSlider/>
      <div className="text-center  logo-font uppercase collectionheading font-thin mb-4">New Arrivals</div>
      <Carousel speed={5000} /> 
      <Carousel speed={7000} />
      <div className='mt-2 mb-2'></div>
      <NewsletterSection/>
      <div className='mt-2 mb-2'></div>
      <Slider/>
    </>
  );
}
