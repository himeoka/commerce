import Image from 'next/image';
import Link from 'next/link';
export async function Banners({
  banners
}: {
  banners: {
    url: string;
    image?: {
      url: string;
      altText: string;
      width: number;
      height: number;
    };
  }[];
}) {
  return (
    <div className="mx-auto my-20 grid max-w-screen-2xl">
      <h1 className="mb-10 text-center text-xl">Banners</h1>
      <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {banners.map((banner) => {
          if (banner.image) {
            return (
              <div key={banner.url}>
                <Link className="" href={banner.url}>
                  <Image
                    alt={banner.image.altText}
                    sizes={'(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'}
                    src={banner.image.url}
                    width={banner.image.width}
                    height={banner.image.height}
                  />
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
