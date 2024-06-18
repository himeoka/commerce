import { getCollections } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export async function CollectionList() {
  const collections = await getCollections();
  console.log(collections);
  return (
    <div className="mx-auto mt-20 grid max-w-screen-2xl">
      <h1 className="mb-10 text-center text-xl">Collection List</h1>
      <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {collections.map((collection) => {
          if (collection.image) {
            return (
              <div key={collection.handle}>
                <Link className="" href={collection.path}>
                  <Image
                    alt={collection.image.altText}
                    sizes={'(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'}
                    src={collection.image.url}
                    width={collection.image.width}
                    height={collection.image.height}
                  />
                  <h2>{collection.title}</h2>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
