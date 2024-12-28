import Link from 'next/link';
import Image from 'next/image';

const SplitSection = () => {
  return (
    <div className="mt-4 flex w-full flex-col md:flex-row">
      <div className="relative  mt-2  mr-3 h-[400px] w-full p-0 md:h-[600px] md:w-1/2">
        <div className="group relative h-full w-full">
          <Image
            src="/topwear.png"
            alt="Left section image"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-25"></div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-white">
            <Link href="/search/casual-shirts" className="hover:underline">
              Casual 
            </Link>
            <Link href="/search/formal-shirts" className="hover:underline">
              Formal 
            </Link>
            <Link href="/search/check-shirts" className="hover:underline">
              Checks
            </Link>
            <Link href="/search/printed-shirts" className="hover:underline">
              Printed
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mt-2 mr-3 h-[400px] w-full p-0 md:h-[600px] md:w-1/2">
        <div className="group relative h-full w-full">
          <Image
            src="/bottomwear.png"
            alt="Right section image"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-25"></div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-white">
            <Link href="/search/jeans" className="hover:underline">
              Jeans
            </Link>
            <Link href="/search/cargo-trousers" className="hover:underline">
              Cargos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitSection;
