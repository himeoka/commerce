'use client';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';

export function Slider({
  images
}: {
  images: {
    id: string;
    image: {
      url: string;
      altText: string;
      width: number;
      height: number;
    };
  }[];
}) {
  return (
    <Splide
      className="mb-10"
      options={{
        rewind: true,
        width: '100%',
        perPage: 1,
        type: 'loop',
        autoplay: true,
        perMove: 1,
        fixedHeight: '80vh'
      }}
    >
      {images.map((image) => (
        <SplideSlide key={image.id}>
          <Image
            alt={image.image.altText}
            sizes={'(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'}
            src={image.image.url}
            width={image.image.width}
            height={image.image.height}
          />
        </SplideSlide>
      ))}
    </Splide>
  );
}
