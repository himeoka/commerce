import clsx from 'clsx';
import { ProductVariant } from 'lib/shopify/types';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  isReserve,
  availableForSale,
  variants,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  isReserve: boolean;
  availableForSale: boolean;
  label?: {
    title: string;
    amount: string;
    minAmount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  variants?: ProductVariant[];
} & React.ComponentProps<typeof Image>) {
  const palette: string[] = [];
  if (variants && variants.length > 1) {
    variants.forEach((variant) => {
      if (variant.palette && variant.palette.value) {
        palette.push(variant.palette.value);
      }
    });
  }
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {isReserve ? (
        <div className="absolute right-0 top-0 z-10 bg-black px-5 text-sm text-white">Reserve</div>
      ) : null}
      {!availableForSale ? (
        <div className="absolute right-0 top-0 z-10 bg-black px-5 text-sm text-white">
          Out of Stock
        </div>
      ) : null}
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          minAmount={label.minAmount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}

      {palette.length > 0 && (
        <div className="absolute bottom-0 right-0 flex  px-4 pb-6 ">
          {palette.map((color) => (
            <div className="ml-2 h-5 w-5" key={color} style={{ backgroundColor: color }}></div>
          ))}
        </div>
      )}
    </div>
  );
}
