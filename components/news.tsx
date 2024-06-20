export async function News({
  newsList
}: {
  newsList: {
    title: string;
    date: string;
    text: string;
  }[];
}) {
  return (
    <div className="mx-auto my-20 grid max-w-screen-2xl">
      <h1 className="mb-10 text-center text-xl">News</h1>
      <div className="mx-auto max-w-screen-sm">
        {newsList.map((news) => (
          <div key={news.title} className="mb-10">
            <p className="mb-5">
              {news.date.replace(/-/g, '/')} <span className="ml-5">{news.title}</span>
            </p>
            <p>{news.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
