'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';
import { useEffect } from 'react';

type Combination = {
  id: string;
  availableForSale: boolean;
  imageUrl?: string;
  [key: string]: string | boolean | undefined;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption, selectedVariantImage, updateSelectedVariantImage } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    imageUrl: variant.image.url, // Store the image URL
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  useEffect(() => {
    if (!selectedVariantImage && variants.length > 0) {
      updateSelectedVariantImage(variants[0].image.url);
    }
  }, [selectedVariantImage, variants]);

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm font-bold tracking-wide">{option.name}:</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            const optionParams = { ...state, [optionNameLowerCase]: value };

            const filtered = Object.entries(optionParams).filter(([key, value]) =>
              options.find(
                (option) => option.name.toLowerCase() === key && option.values.includes(value)
              )
            );

            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) => combination[key] === value && combination.availableForSale
              )
            );

            const isActive = state[optionNameLowerCase] === value;

            return (
              <button
                type="button"
                onClick={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);

                  // Store the image URL in local storage when variant is selected
                  const selectedVariant = combinations.find((combination) =>
                    filtered.every(([key, val]) => combination[key] === val)
                  );
                  if (selectedVariant?.imageUrl) {
                    updateSelectedVariantImage(selectedVariant.imageUrl);

                    // console.log('selectedVariantImageUrl: ', selectedVariant.imageUrl);
                    // localStorage.setItem('selectedImageUrl', selectedVariant.imageUrl);
                  }
                }}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                className={clsx(
                  'flex min-w-[48px] items-center justify-center rounded-xl border bg-white px-3 py-3 text-sm',
                  {
                    'cursor-default ring-2 ring-black': isActive,
                    'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-black':
                      !isActive && isAvailableForSale,
                    'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform':
                      !isAvailableForSale
                  }
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
