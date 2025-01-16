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

      <div className="font-tenor-sans mt-5 flex max-w-screen-2xl flex-col px-0 pb-0 text-black md:flex-row">
        <div className="right flex items-center gap-3"></div>
        <div className="order-first flex-none pl-5 pr-5 md:flex md:w-[20%] md:flex-col lg:pl-10">
          <div className="border-line flex-none border-b">
            <Collections />
          </div>
          <div className="flex-none">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>

        <div className="order-last min-h-screen flex-grow md:order-none md:w-[100%] lg:py-0">
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </div>
      </div>
    </>
  );
}
