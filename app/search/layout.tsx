import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import { FaCaretDown } from 'react-icons/fa';
import * as Icon from '@phosphor-icons/react/dist/ssr';
import ChildrenWrapper from './children-wrapper';
import Breadcrumb from 'components/shopbreadcrumbs';

interface SearchLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      <Breadcrumb />

      <div className="mt-5 flex max-w-screen-2xl flex-col px-0 pb-0 text-black md:flex-row">
        <div className="right flex items-center gap-3"></div>
        <div className="order-first flex-none pl-5 pr-5 md:flex md:w-[20%] md:flex-col lg:pl-10">
          <div className="border-line flex-none border-b">
            <Collections />
          </div>
          <div className="flex-none">
            <FilterList list={sorting} title="Sort by" />
          </div>
          <div className="filter-size border-line mt-8 border-b pb-8">
            <div className="heading6">Size</div>
            <div className="list-size mt-4 flex flex-wrap items-center gap-3 gap-y-4">
              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((item, index) => (
                <div
                  key={index}
                  className={`size-item text-button border-line flex h-[44px] w-[44px] items-center justify-center rounded-full border`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="filter-color border-line mt-8 border-b pb-8">
            <div className="heading6">colors</div>
            <div className="list-color mt-4 flex flex-wrap items-center gap-3 gap-y-4">
              <div
                className={`color-item border-line flex items-center justify-center gap-2 rounded-full border px-3 py-[5px]`}
                // onClick={() => handleColor('pink')}
              >
                <div className="color h-5 w-5 rounded-full bg-[#F4C5BF]"></div>
                <div className="caption1 capitalize">pink</div>
              </div>
              <div
                className={`color-item border-line flex items-center justify-center gap-2 rounded-full border px-3 py-[5px]`}
                // onClick={() => handleColor('red')}
              >
                <div className="color bg-red h-5 w-5 rounded-full"></div>
                <div className="caption1 capitalize">red</div>
              </div>
              <div
                className={`color-item border-line flex items-center justify-center gap-2 rounded-full border px-3 py-[5px]`}
                // onClick={() => handleColor('green')}
              >
                <div className="color h-5 w-5 rounded-full bg-green-300"></div>
                <div className="caption1 capitalize">green</div>
              </div>
              <div
                className={`color-item border-line flex items-center justify-center gap-2 rounded-full border px-3 py-[5px]`}
                // onClick={() => handleColor('yellow')}
              >
                <div className="color bg-yellow h-5 w-5 rounded-full"></div>
                <div className="caption1 capitalize">yellow</div>
              </div>
              <div
                className={`color-item border-line flex items-center justify-center gap-2 rounded-full border px-3 py-[5px]`}
                // onClick={() => handleColor('purple')}
              >
                <div className="color bg-purple h-5 w-5 rounded-full"></div>
                <div className="caption1 capitalize">purple</div>
              </div>
              <div
                className={`color-item border-line flex items-center justify-center gap-2 rounded-full border px-3 py-[5px]`}
                // onClick={() => handleColor('black')}
              >
                <div className="color h-5 w-5 rounded-full bg-black"></div>
                <div className="caption1 capitalize">black</div>
              </div>
              <div
                className={`color-item border-line flex items-center justify-center gap-2 rounded-full border px-3 py-[5px]`}
                // onClick={() => handleColor('white')}
              >
                <div className="color h-5 w-5 rounded-full bg-[#F6EFDD]"></div>
                <div className="caption1 capitalize">white</div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-last min-h-screen flex-grow md:order-none md:w-[80%] lg:py-0">
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </div>
      </div>
    </>
  );
}
