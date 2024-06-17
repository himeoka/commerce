'use client';
import { Splide, SplideSlide } from 'splide-nextjs/react-splide';
import 'splide-nextjs/splide/dist/css/themes/splide-default.min.css';

export async function Slider() {
  return (
    <Splide
      className="mb-10"
      options={{
        rewind: true,
        width: window.innerWidth,
        perPage: 1,
        type: 'loop',
        autoplay: true,
        perMove: 1
      }}
    >
      <SplideSlide>
        <img src="/img/top/summer_2022_1.jpg" alt="Image 1" className="bnr" />
      </SplideSlide>
      <SplideSlide>
        <img src="/img/top/summer_2022_2.jpg" alt="Image 1" className="bnr" />
      </SplideSlide>
      <SplideSlide>
        <img src="/img/top/summer_2022_3.jpg" alt="Image 1" className="bnr" />
      </SplideSlide>
    </Splide>
  );
}
