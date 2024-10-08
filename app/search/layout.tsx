import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import ChildrenWrapper from './children-wrapper';
import Breadcrumb from 'components/shopbreadcrumbs';

interface SearchLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
     <Breadcrumb  />
      <div className="flex max-w-screen-2xl flex-col px-0 pb-0 text-black md:flex-row mt-5 ">
     
        <div className="order-first flex-none md:flex md:flex-col md:w-[250px]   "> 
          <div className="flex-none">
            <Collections />
          </div>
          <div className="flex-none ml-10">
            {/* <FilterList list={sorting} title="Sort by" /> */}
          </div>
        </div>

        <div className="order-last min-h-screen flex-grow md:order-none lg:py-0">
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </div>
      </div>
    </>
  );
}
