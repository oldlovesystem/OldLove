import React from 'react';
import { SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface SortDropdownProps {
  list: SortFilterItem[];
}

const SortDropdown: React.FC<SortDropdownProps> = ({ list }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  return (
    <div className="relative">
      <button className="bg-white text-black p-2 rounded">Sort Options</button>
      <ul className="absolute bg-white shadow-md mt-2 w-full">
        {list.map(item => {
          const href = createUrl(
            pathname,
            new URLSearchParams({
              ...(q && { q }),
              ...(item.slug && { sort: item.slug })
            })
          );

          return (
            <li key={item.slug}>
              <Link href={href} className="block px-4 py-2 hover:bg-gray-200">
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SortDropdown;