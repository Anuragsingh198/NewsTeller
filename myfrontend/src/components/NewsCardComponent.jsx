import React from "react";

// Mock Data
const newsData = [
  {
    article_id: "ed2ebc7c85998fb93d7dc7c3eb861c4f",
    title: "Frites légères et savoureuses : Astuces pour se régaler sans culpabilité",
    link: "https://www.linfodrome.com/cuisine/108399-frites-legeres-et-savoureuses-astuces-pour-se-regaler-sans-culpabilite",
    category: ["cuisine"],
    description:
      'Les frites, qu\'elles soient dorées, croustillantes ou fondantes, sont un délice apprécié de tous. Cependant, leur réputation de "malbouffe" les place souvent sur la liste noire des régimes équilibrés.',
    pubDate: "2025-04-16 15:58:00",
    image_url:
      "https://www.linfodrome.com/media/article/images/src/108399-frites-legeres-et-savoureuses.webp",
  },
  {
    article_id: "a1ea7441cf8a7cb0f2c061b42ebd8eb1",
    title:
      "Μ. Βορίδης - Β.Κικίλιας: Εθνική στρατηγική αποτροπής της παράνομης μετανάστευσης και θεσμική θωράκιση απέναντι στην καταχρηστική δράση των ΜΚΟ",
    link: "https://www.capital.gr/politiki/3912899/m-boridis-b-kikilias-ethniki-stratigiki-apotropis-tis-paranomis-metanasteusis-kai-thesmiki-thorakisi-apenanti-stin-kataxristiki-drasi-ton-mko/",
    category: null,
    description:
      "Ο εθνικός στόχος της αποτροπής των μεταναστευτικών ροών και η ανάγκη ενίσχυσης του Λιμενικού Σώματος βρέθηκαν στο επίκεντρο της συνάντησης.",
    pubDate: "2025-04-16 15:58:00",
    image_url:
      "https://www.capital.gr/Content/ImagesDatabase/p/640x400/crop/both/89/89ca35131e774c00bd936ea97e7b174b.jpg",
  },
  {
    article_id: "27d4a0cccfdf78579bb47f6cf9b8416f",
    title: "Meet the April Teacher of the Month: Ella Meredith",
    link: "https://www.postandcourier.com/lowcountryparent/education/meet-the-april-teacher-of-the-month-ella-meredith/article_2f79150d-8fc7-48ff-8e1f-0dbd7f08602f.html",
    category: null,
    description:
      "Meet the April Teacher of the Month: Ella Meredith, who teaches first grade at Hunley Park Elementary School.",
    pubDate: "2025-04-16 15:58:00",
    image_url:
      "https://bloximages.newyork1.vip.townnews.com/postandcourier.com/content/tncms/assets/v3/editorial/f/88/f88d47c7-9c08-42fb-a0a6-3171828f4dde/67ffd6adb1641.image.jpg?resize=400%2C210",
  },
  {
    article_id: "ed2ebc7c85998fb93d7dc7c3eb861c4f",
    title: "Frites légères et savoureuses : Astuces pour se régaler sans culpabilité",
    link: "https://www.linfodrome.com/cuisine/108399-frites-legeres-et-savoureuses-astuces-pour-se-regaler-sans-culpabilite",
    category: ["cuisine"],
    description:
      'Les frites, qu\'elles soient dorées, croustillantes ou fondantes, sont un délice apprécié de tous. Cependant, leur réputation de "malbouffe" les place souvent sur la liste noire des régimes équilibrés.',
    pubDate: "2025-04-16 15:58:00",
    image_url:
      "https://www.linfodrome.com/media/article/images/src/108399-frites-legeres-et-savoureuses.webp",
  },
  {
    article_id: "a1ea7441cf8a7cb0f2c061b42ebd8eb1",
    title:
      "Μ. Βορίδης - Β.Κικίλιας: Εθνική στρατηγική αποτροπής της παράνομης μετανάστευσης και θεσμική θωράκιση απέναντι στην καταχρηστική δράση των ΜΚΟ",
    link: "https://www.capital.gr/politiki/3912899/m-boridis-b-kikilias-ethniki-stratigiki-apotropis-tis-paranomis-metanasteusis-kai-thesmiki-thorakisi-apenanti-stin-kataxristiki-drasi-ton-mko/",
    category: null,
    description:
      "Ο εθνικός στόχος της αποτροπής των μεταναστευτικών ροών και η ανάγκη ενίσχυσης του Λιμενικού Σώματος βρέθηκαν στο επίκεντρο της συνάντησης.",
    pubDate: "2025-04-16 15:58:00",
    image_url:
      "https://www.capital.gr/Content/ImagesDatabase/p/640x400/crop/both/89/89ca35131e774c00bd936ea97e7b174b.jpg",
  },
  {
    article_id: "27d4a0cccfdf78579bb47f6cf9b8416f",
    title: "Meet the April Teacher of the Month: Ella Meredith",
    link: "https://www.postandcourier.com/lowcountryparent/education/meet-the-april-teacher-of-the-month-ella-meredith/article_2f79150d-8fc7-48ff-8e1f-0dbd7f08602f.html",
    category: null,
    description:
      "Meet the April Teacher of the Month: Ella Meredith, who teaches first grade at Hunley Park Elementary School.",
    pubDate: "2025-04-16 15:58:00",
    image_url:
      "https://bloximages.newyork1.vip.townnews.com/postandcourier.com/content/tncms/assets/v3/editorial/f/88/f88d47c7-9c08-42fb-a0a6-3171828f4dde/67ffd6adb1641.image.jpg?resize=400%2C210",
  },
  {
    article_id: "ed2ebc7c85998fb93d7dc7c3eb861c4f",
    title: "Frites légères et savoureuses : Astuces pour se régaler sans culpabilité",
    link: "https://www.linfodrome.com/cuisine/108399-frites-legeres-et-savoureuses-astuces-pour-se-regaler-sans-culpabilite",
    category: ["cuisine"],
    description:
      'Les frites, qu\'elles soient dorées, croustillantes ou fondantes, sont un délice apprécié de tous. Cependant, leur réputation de "malbouffe" les place souvent sur la liste noire des régimes équilibrés.',
    pubDate: "2025-04-16 15:58:00",
    image_url:
      "https://www.linfodrome.com/media/article/images/src/108399-frites-legeres-et-savoureuses.webp",
  },
  {
    article_id: "a1ea7441cf8a7cb0f2c061b42ebd8eb1",
    title:
      "Μ. Βορίδης - Β.Κικίλιας: Εθνική στρατηγική αποτροπής της παράνομης μετανάστευσης και θεσμική θωράκιση απέναντι στην καταχρηστική δράση των ΜΚΟ",
    link: "https://www.capital.gr/politiki/3912899/m-boridis-b-kikilias-ethniki-stratigiki-apotropis-tis-paranomis-metanasteusis-kai-thesmiki-thorakisi-apenanti-stin-kataxristiki-drasi-ton-mko/",
    category: null,
    description:
      "Ο εθνικός στόχος της αποτροπής των μεταναστευτικών ροών και η ανάγκη ενίσχυσης του Λιμενικού Σώματος βρέθηκαν στο επίκεντρο της συνάντησης.",
    pubDate: "2025-04-16 15:58:00",
    image_url:
      "https://www.capital.gr/Content/ImagesDatabase/p/640x400/crop/both/89/89ca35131e774c00bd936ea97e7b174b.jpg",
  },
  {
    article_id: "27d4a0cccfdf78579bb47f6cf9b8416f",
    title: "Meet the April Teacher of the Month: Ella Meredith",
    link: "https://www.postandcourier.com/lowcountryparent/education/meet-the-april-teacher-of-the-month-ella-meredith/article_2f79150d-8fc7-48ff-8e1f-0dbd7f08602f.html",
    category: null,
    description:
      "Meet the April Teacher of the Month: Ella Meredith, who teaches first grade at Hunley Park Elementary School.",
    pubDate: "2025-04-16 15:58:00",
    image_url:
      "https://bloximages.newyork1.vip.townnews.com/postandcourier.com/content/tncms/assets/v3/editorial/f/88/f88d47c7-9c08-42fb-a0a6-3171828f4dde/67ffd6adb1641.image.jpg?resize=400%2C210",
  },
];

// Card Component
function NewsCardComponent({ article }) {
  return (
    <div className="w-[330px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href={article.link} target="_blank" rel="noopener noreferrer">
      <img
        className="rounded-t-lg h-40 w-full object-cover"
        src={article.image_url}
        alt="News Thumbnail"
      />
    </a>
    <div className="p-4 h-[250px] overflow-hidden">
      <a href={article.link} target="_blank" rel="noopener noreferrer">
        <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
          {article.title}
        </h5>
      </a>
      {/* category */}
      {
       <div className="mb-2">
       <p className="text-xs font-medium text-gray-600 dark:text-gray-400 line-clamp-1">
         Category: {article.category ? article.category.join(", ") : "General"}
       </p>
     </div>
      }
      {/* Description */}
      <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
        {article.description}
      </p>
      {/* Publication Date */}
      <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
        Published on: {new Date(article.pubDate).toLocaleString()}
      </p>
      <a
        href={article.link}
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {newsData.map((article) => (
      <NewsCardComponent key={article.article_id} article={article} />
    ))}
  </div>
  
  );
}

export default NewsCardList;
