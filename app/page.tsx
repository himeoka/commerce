import { Banners } from 'components/banners';
import { Carousel } from 'components/carousel';
import { CollectionList } from 'components/collection-list';
import { TopItems } from 'components/grid/top-items';
import Footer from 'components/layout/footer';
import { News } from 'components/news';
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
  const banners: string[] | null = page.banner ? JSON.parse(page.banner.value) : null;
  const bannerObj: {
    url: string;
    image: {
      url: string;
      altText: string;
      width: number;
      height: number;
    };
  }[] = [];
  if (banners) {
    const bannerData = await getNodes(banners);
    const imageList = bannerData.map((banner: any) => {
      return banner.fields.find((element: any) => element.key === 'image').value;
    });
    const image = await getNodes(imageList);

    for (let x = 0; x < bannerData.length; x++) {
      const obj = {
        url: bannerData[x].fields.find((element: any) => element.key === 'link_url').value,
        image: image[x].image
      };
      bannerObj.push(obj);
    }
  }
  const news: string[] | null = page.news ? JSON.parse(page.news.value) : null;
  const newsList: {
    title: string;
    date: string;
    text: string;
  }[] = [];
  if (news) {
    const newsData = await getNodes(news);
    newsData.forEach((news: any) => {
      newsList.push({
        title: news.fields.find((element: any) => element.key === 'title').value,
        date: news.fields.find((element: any) => element.key === 'date').value,
        text: news.fields.find((element: any) => element.key === 'texts').value
      });
    });
    console.log(newsList);
  }
  return (
    <>
      {slides && <Slider images={images} />}
      <TopItems />
      <Suspense>
        <CollectionList />
        <Carousel />
        <Banners banners={bannerObj} />
        <News newsList={newsList} />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
