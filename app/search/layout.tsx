import Footer from 'components/layout/footer';
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
      <div className="mx-auto flex bg-linear max-w-screen-2xl flex-col px-0 pb-0 text-black md:flex-row">
        {/* Side panel containing both Collections and FilterList */}
        <div className="order-first flex-none md:flex md:flex-col md:w-[250px] lg:mt-60 bg-white">
          <div className="flex-none md:py-10">
            <Collections />
          </div>
          <div className="flex-none   border-gray-300">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>

        {/* Main content area */}
        <div className="order-last min-h-screen flex-grow md:order-none lg:py-0 ">
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </div>
      </div>
      <Footer />
    </>
  );
}
