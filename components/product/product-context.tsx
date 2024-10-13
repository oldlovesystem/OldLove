'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {
  createContext,
  startTransition,
  useContext,
  useMemo,
  useOptimistic,
  useState
} from 'react';

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};

type ProductContextType = {
  state: ProductState;
  selectedVariantImage: string | null;
  updateOption: (name: string, value: string) => ProductState;
  updateImage: (index: string) => ProductState;
  updateSelectedVariantImage: (variant: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update
    })
  );

  const [selectedVariantImage, setSelectedVariantImage] = useState<string | null>(null);

  const updateOption = (name: string, value: string) => {
    const newState = { [name]: value };
    startTransition(() => {
      setOptimisticState(newState);
    });
    return { ...state, ...newState };
  };

  const updateImage = (index: string) => {
    const newState = { image: index };
    startTransition(() => {
      setOptimisticState(newState);
    });
    return { ...state, ...newState };
  };

  const updateSelectedVariantImage = (variant: string) => {
    setSelectedVariantImage(variant);
  };

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage,
      selectedVariantImage,
      updateSelectedVariantImage
    }),
    [state, selectedVariantImage]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
