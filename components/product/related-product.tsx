import { GridTileImage } from 'components/grid/tile';
import { getProductById } from 'lib/shopify';
export async function RelatedProduct({ id }: { id: string }) {
  const product = await getProductById(id);
  if (!product) return null;

  return (
    <div className="relative h-full w-full">
      <GridTileImage
        alt={product.title}
        label={{
          title: product.title,
          minAmount: product.priceRange.minVariantPrice.amount,
          amount: product.priceRange.maxVariantPrice.amount,
          currencyCode: product.priceRange.maxVariantPrice.currencyCode
        }}
        isReserve={product.tags.includes('予約') ? true : false}
        availableForSale={product.availableForSale}
        src={product.featuredImage?.url}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
        variants={product.variants}
        handle={product.handle}
      />
    </div>
  );
}
