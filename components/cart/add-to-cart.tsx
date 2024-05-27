'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  isYoyaku
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  isYoyaku:
    | {
        key: string;
        value: string;
      }[]
    | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';
  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        {isYoyaku ? <>Reserve</> : <>Add To Cart</>}
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
      </div>
      {isYoyaku ? <>Reserve</> : <>Add To Cart</>}
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  tags
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  tags: string[] | undefined;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariant = variants.length === 1 ? variants[0] : undefined;
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const isYoyaku =
    tags && tags.includes('予約') ? [{ key: 'is_yoyaku', value: 'true' }] : undefined;
  const actionWithVariant = formAction.bind(null, { selectedVariantId, attributes: isYoyaku });
  return (
    <form action={actionWithVariant}>
      {variant && (
        <p className="mb-5">
          {variant.title}
          {`${new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: variant.price.currencyCode,
            currencyDisplay: 'narrowSymbol'
          }).format(parseFloat(variant.price.amount))}`}
          {variant.compareAtPrice && variant.compareAtPrice.amount !== variant.price.amount && (
            <span className="ml-5">
              割引前価格 :
              {`${new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: variant.compareAtPrice.currencyCode,
                currencyDisplay: 'narrowSymbol'
              }).format(parseFloat(variant.compareAtPrice.amount))}`}
            </span>
          )}
        </p>
      )}
      {defaultVariant && defaultVariant.compareAtPrice && (
        <p className="mb-5">
          割引前価格 :
          {`${new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: defaultVariant.compareAtPrice.currencyCode,
            currencyDisplay: 'narrowSymbol'
          }).format(parseFloat(defaultVariant.compareAtPrice.amount))}`}
        </p>
      )}
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        isYoyaku={isYoyaku}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
