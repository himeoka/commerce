import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';

import { getCollectionProducts } from 'lib/shopify';

export async function TopItems() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'top'
  });

  return (
    <section className="mx-auto grid max-w-screen-2xl">
      <h1 className="mb-10 text-center text-xl">NEW ARRIVAL</h1>
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <ProductGridItems products={homepageItems} />
      </Grid>
    </section>
  );
}
