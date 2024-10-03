import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row  justify-between py-12 px-6 md:px-16 bg-gray-50 space-x-10">
      {/* Text Section */}
      <div className="md:w-1/2 flex flex-col justify-center items-start space-y-4">
      <h1 className="text-5xl  text-gray-900 mb-3">About Us</h1>
      <h2 className="text-3xl  text-gray-900">
    Crafting Elegance, Embracing Style
        </h2>
        <p className="text-lg font-thin text-gray-700 text-justify space-y-2">
            Welcome to Old Love, where style meets comfort. Our journey began
            with a passion for timeless fashion and a vision to provide men with
            quality clothing that exudes confidence. At Old love, we take pride in
            curating a collection that reflects sophistication and modern elegance.
            Discover the perfect blend of craftsmanship and contemporary design
            as we redefine men's fashion. Our team is dedicated to delivering
            exceptional service, ensuring that every customer feels empowered
            and inspired by their wardrobe choices.
            Explore our story to uncover the inspiration behind Old love and join
            us in celebrating individuality and sartorial expression. Embrace the
            essence of sophistication with Old love Menswear.
            </p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-8 md:mt-0 w-full">
        <Image
          src="/IMG_0012.JPG" 
          alt="About Us Image"
          width={500}
          height={500}
          className="rounded-lg "
        />
      </div>
    </div>
  );
};

export default AboutUs;
