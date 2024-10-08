'use client';

import clsx from 'clsx';
import type { SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ListItem, PathFilterItem } from '.';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? 'p' : Link;

  newParams.delete('q');

  return (
    <li className="mt-2 flex items-center justify-between text-white dark:text-black" key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx(
          'flex-1 text-gray-600 underline-offset-4 py-1 hover:underline dark:hover:underline',
          {
            'underline underline-offset-4': active
          }
        )}
      >
        {capitalizeFirstLetter(item.title)}
      </DynamicTag>
      <span className="ml-2 text-gray-600">({item.productCount ? item.productCount : '0'})</span>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug })
    })
  );
  const DynamicTag = active ? 'p' : Link;

  return (
    <li className="mt-2 flex items-center justify-between text-lg text-black dark:text-black" key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('flex-1 hover:underline text-gray-600 hover:underline-offset-4', {
          'underline underline-offset-4': active
        })}
      >
        {capitalizeFirstLetter(item.title)}
      </DynamicTag>
      {/* No product count for SortFilterItem */}
      <span className="ml-2"></span>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />;
}
