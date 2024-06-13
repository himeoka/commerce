import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
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
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            variants={product.variants}
            handle={product.handle}
          />
        </Grid.Item>
      ))}
    </>
  );
}
