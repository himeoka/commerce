import { Carousel } from 'components/carousel';
import { CollectionList } from 'components/collection-list';
import { TopItems } from 'components/grid/top-items';
import Footer from 'components/layout/footer';

import { Slider } from 'components/slider';
import { getNodes, getPage } from 'lib/shopify';
import { Suspense } from 'react';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const page = await getPage('top');
  const slides: string[] | null = page.slider ? JSON.parse(page.slider.value) : null;
  let images: {
    id: string;
    image: {
      url: string;
      altText: string;
      width: number;
      height: number;
    };
  }[] = [];
  if (slides) {
    images = await getNodes(slides);
  }
  return (
    <>
      {slides && <Slider images={images} />}
      <TopItems />
      <Suspense>
        <CollectionList />
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
