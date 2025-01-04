'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
  const [initialLoad, setInitialLoad] = useState(true);

  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    imageUrl: variant.image.url,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  useEffect(() => {
    // Prevent running this logic if no options are available
    if (!options || options.length === 0) return;

    const colorOption = options.find((option) => option.name.toLowerCase() === 'color');

    // Default to the first color option if not already selected
    if (colorOption && !state.color && colorOption.values.length > 0) {
      const defaultColor = colorOption.values[0];
      const variantWithImage = combinations.find(
        (combination) => combination.color === defaultColor && combination.imageUrl
      );

      if (state.color !== defaultColor) {
        updateOption('color', defaultColor);
        updateURL({ ...state, color: defaultColor });

        if (variantWithImage?.imageUrl) {
          updateSelectedVariantImage(variantWithImage.imageUrl);
        }
      }
    } else if (colorOption && state.color) {
      const variantWithImage = combinations.find(
        (combination) => combination.color === state.color && combination.imageUrl
      );

      if (
        variantWithImage?.imageUrl &&
        selectedVariantImage !== variantWithImage.imageUrl &&
        initialLoad === true
      ) {
        updateSelectedVariantImage(variantWithImage.imageUrl);
        setInitialLoad(false);
      }
    }

    const defaultColor = colorOption?.values[0];
    const variantWithImage = combinations?.find(
      (combination) => combination.color === defaultColor && combination.imageUrl
    );

    // Default to the first image if none is selected
    if (
      !selectedVariantImage &&
      variants.length > 0 &&
      variants[0].image.url !== selectedVariantImage &&
      !defaultColor
    ) {
      updateSelectedVariantImage(variants[0]?.image?.url);
    }
  }, [
    combinations,
    state.color,
    selectedVariantImage,
    variants,
    updateOption,
    updateSelectedVariantImage,
    updateURL
  ]);

  console.log('XXX, selectedVariantImage', selectedVariantImage);

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm font-bold tracking-wide">{option.name}:</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            const isActive = state[optionNameLowerCase] === value;

            const isAvailableForSale = combinations.some(
              (combination) =>
                combination[optionNameLowerCase] === value && combination.availableForSale
            );

            const variantWithImage = combinations.find(
              (combination) => combination[optionNameLowerCase] === value && combination.imageUrl
            );

            const isColorOption = option.name.toLowerCase() === 'color';

            return (
              <button
                type="button"
                onClick={() => {
                  const newState = updateOption(optionNameLowerCase, value);

                  updateURL(newState);

                  if (variantWithImage?.imageUrl) {
                    updateSelectedVariantImage(variantWithImage.imageUrl);
                  }
                }}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                className={clsx(
                  'flex flex-col items-center justify-center rounded-xl px-3 py-3 text-sm',
                  {
                    'cursor-default ring-2 ring-black': isActive,
                    'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-black':
                      !isActive && isAvailableForSale,
                    'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform':
                      !isAvailableForSale
                  }
                )}
              >
                {isColorOption && variantWithImage?.imageUrl && (
                   <img
                   src={variantWithImage.imageUrl}
                   alt={`${option.name} ${value}`}
                   width={50}
                   height={50}
                   className="mb-2 rounded"
                 />
                )}
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
