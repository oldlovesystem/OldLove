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
      <div className="mr-14 mt-5 flex justify-end">
        <div className="select-block relative">
          <select
            id="select-filter"
            name="select-filter"
            className="caption1 border-line w-full rounded-lg border py-2 pl-3 pr-10 md:pr-10"
            defaultValue={'Sorting'}
            // onChange={(e) => { handleSortChange(e.target.value) }}
          >
            <option value="Sorting" disabled>
              Sorting
            </option>
            <option value="soldQuantityHighToLow">Best Selling</option>
            <option value="discountHighToLow">Best Discount</option>
            <option value="priceHighToLow">Price High To Low</option>
            <option value="priceLowToHigh">Price Low To High</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
            <FaCaretDown size={12} className="text-gray-400" />
          </div>
        </div>
      </div>
      <div className="mt-5 flex max-w-screen-2xl flex-col px-0 pb-0 text-black md:flex-row">
        <div className="right flex items-center gap-3"></div>
        <div className="order-first flex-none  pl-10 md:flex md:w-[20%] md:flex-col ">
          <div className="flex-none border-b border-line  ">
            <Collections />
          </div>
          {/* <div className="flex-none ">
            <FilterList list={sorting} title="Sort by" />
          </div> */}
          <div className="filter-size border-line mt-8 border-b pb-8">
            <div className="heading6">Size</div>
            <div className="list-size mt-4 flex flex-wrap items-center gap-3 gap-y-4">
              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((item, index) => (
                <div
                  key={index}
                  className={`size-item text-button border-line flex h-[44px] w-[44px] items-center justify-center rounded-full border `}

                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="filter-color pb-8 border-b border-line mt-8">
                                <div className="heading6">colors</div>
                                <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                                        // onClick={() => handleColor('pink')}
                                    >
                                        <div className="color bg-[#F4C5BF] w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">pink</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                                        // onClick={() => handleColor('red')}
                                    >
                                        <div className="color bg-red w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">red</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line`}
                                        // onClick={() => handleColor('green')}
                                    >
                                        <div className="color bg-green-300 w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">green</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                                        // onClick={() => handleColor('yellow')}
                                    >
                                        <div className="color bg-yellow w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">yellow</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                                        // onClick={() => handleColor('purple')}
                                    >
                                        <div className="color bg-purple w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">purple</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                                        // onClick={() => handleColor('black')}
                                    >
                                        <div className="color bg-black w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">black</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line`}
                                        // onClick={() => handleColor('white')}
                                    >
                                        <div className="color bg-[#F6EFDD] w-5 h-5 rounded-full"></div>
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
