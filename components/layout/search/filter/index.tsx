import { SortFilterItem } from 'lib/constants';
import { Suspense } from 'react';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string; productCount?: number };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  console.log("print",title)
  return (
    <nav className="bg-white text-black w-full m-0 p-2 ">
      {title ? (
        <h3 className="hidden text-xl font-semibold md:block mb-2">
          {title}
        </h3>
      ) : null}
      <ul className="hidden md:block md:bg-white md:text-black">
        <Suspense fallback={null}>
          <FilterItemList list={list} />
        </Suspense>
      </ul>
      <ul className="md:hidden">
        <Suspense fallback={null}>
          <FilterItemDropdown list={list} />
        </Suspense>
      </ul>
    </nav>
  );
}
