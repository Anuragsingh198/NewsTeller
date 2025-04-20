import {useState, useContext, useEffect} from "react";
import context from "../context/contextProvider";
import { fetchNews } from "../context/contextAction";


// Card Component
function NewsCardComponent({ news }) {
  return (
    <div className="w-[330px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href={news.link} target="_blank" rel="noopener noreferrer">
      <img
        className="rounded-t-lg h-40 w-full object-cover"
        src={news.image_url}
        alt="News Thumbnail"
      />
    </a>
    <div className="p-4 h-[250px] overflow-hidden">
      <a href={news.link} target="_blank" rel="noopener noreferrer">
        <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
          {news.title}
        </h5>
      </a>
      {/* category */}
      {
       <div className="mb-2">
       <p className="text-xs font-medium text-gray-600 dark:text-gray-400 line-clamp-1">
         Category: {news.category}
       </p>
     </div>
      }
      {/* Description */}
      <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
        {news.description}
      </p>
      {/* Publication Date */}
      <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
        Published on: {new Date(news.pubDate).toLocaleString()}
      </p>
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  </div>
  
  );
}

// Parent Component that maps and renders multiple cards
function NewsCardList() {
  const { news, dispatch } = useContext(context); // ✅ notice this change
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchNews(dispatch, page);
    console.log(news); 
  }, [dispatch, page , news]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (!news) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {news.map((n) => (
          <NewsCardComponent key={n.article_id} news={n} />
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Next
        </button>
      </div>

      <p className="mt-2 text-sm text-gray-600">Page: {page}</p>
    </div>
  );
}

export default NewsCardList;
