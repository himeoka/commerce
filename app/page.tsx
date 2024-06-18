import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
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
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
