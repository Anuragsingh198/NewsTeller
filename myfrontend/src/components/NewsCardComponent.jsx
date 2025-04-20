import {useState, useContext, useEffect} from "react";
import context from "../context/contextProvider";
import { fetchNews } from "../context/contextAction";

// Card Component (unchanged)
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
        <div className="mb-2">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 line-clamp-1">
            Category: {news.category}
          </p>
        </div>
        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
          {news.description}
        </p>
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

function NewsCardList() {
  const { news, dispatch } = useContext(context); 
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [allNews, setAllNews] = useState([]); // Store all fetched news

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    fetchNews(dispatch, page)
      .then((data) => {
        // Merge new data with existing data, avoiding duplicates
        setAllNews(prev => {
          const existingIds = new Set(prev.map(item => item.article_id));
          const newItems = data.filter(item => !existingIds.has(item.article_id));
          return [...prev, ...newItems];
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  }, [dispatch, page]);

  // Extract unique categories when allNews changes
  useEffect(() => {
    if (allNews && allNews.length > 0) {
      const uniqueCategories = ['all', ...new Set(allNews.map(item => item.category))];
      setCategories(uniqueCategories);
    }
  }, [allNews]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Don't reset page number here
  };

  // Filter news based on selected category and paginate
  const filteredNews = selectedCategory === 'all' 
    ? allNews.slice((page - 1) * 6, page * 6) // Show 6 items per page
    : allNews
        .filter(item => item.category === selectedCategory)
        .slice((page - 1) * 6, page * 6);

  // Check if there are items for the current page and category
  const hasItemsForCurrentPage = selectedCategory === 'all'
    ? allNews.length > (page - 1) * 6
    : allNews.filter(item => item.category === selectedCategory).length > (page - 1) * 6;

  // If no items for current page but page > 1, go to last available page
  useEffect(() => {
    if (!hasItemsForCurrentPage && page > 1) {
      const totalItems = selectedCategory === 'all' 
        ? allNews.length 
        : allNews.filter(item => item.category === selectedCategory).length;
      const lastPage = Math.ceil(totalItems / 6);
      setPage(lastPage > 0 ? lastPage : 1);
    }
  }, [hasItemsForCurrentPage, page, selectedCategory, allNews]);

  if (!allNews || allNews.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Category Filter */}
      <div className="mb-6 w-full max-w-4xl">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredNews.map((n) => (
              <NewsCardComponent key={n.article_id} news={n} />
            ))}
          </div>

          {/* Pagination Controls */}
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
              disabled={filteredNews.length < 6} // Disable if less than full page
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <p className="mt-2 text-sm text-gray-600">Page: {page}</p>
          {selectedCategory !== 'all' && (
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredNews.length} items in category: {selectedCategory}
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-500 py-8">No news found for the selected category and page.</p>
      )}
    </div>
  );
}

export default NewsCardList;