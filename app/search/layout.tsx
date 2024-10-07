import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import ChildrenWrapper from './children-wrapper';

interface SearchLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl flex-col px-0 pb-0 text-black md:flex-row">
        <div className="order-first flex-none md:flex md:flex-col md:w-[250px] lg:mt-[253px] bg-white "> {/* Use custom value */}
          <div className="flex-none mt-5 md:py-10 ml-10 ">
            <Collections />
          </div>
          <div className="flex-none ml-10">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>

        <div className="order-last min-h-screen flex-grow md:order-none lg:py-0">
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </div>
      </div>
    </>
  );
}
