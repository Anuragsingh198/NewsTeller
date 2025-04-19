import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
    BarChart,
    PieChart, Pie, Cell,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from "recharts";
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57'];
// Mock Articles Data
const articles = [
    {
        article_id: "f654hgf321poi876lkjh",
        title: "5G Expansion Across Asia in 2025",
        link: "https://www.techasia.com/5g-expansion-2025/",
        description: "5G networks to cover 85% of Asia by the end of the year.",
        pubDate: "2025-04-12 18:50:00",
        image_url: "https://www.techasia.com/images/5g_expansion.jpg",
        source_name: "TechAsia",
        language: "english",
        country: ["singapore"],
        category: ["technology"],
        duplicate: false
    },
    {
        article_id: "g321tre654yui987zxcv",
        title: "World Leaders Meet to Discuss Climate Crisis",
        link: "https://www.globalnews.com/climate-summit-2025/",
        description: "Urgent talks held to address global warming concerns.",
        pubDate: "2025-04-11 11:00:00",
        image_url: "https://www.globalnews.com/images/climate_summit.jpg",
        source_name: "Global News",
        language: "french",
        country: ["france"],
        category: ["politics"],
        duplicate: false
    },
    {
        article_id: "h789bnm012vfr345plok",
        title: "New Smartphone Launch Breaks Pre-Order Records",
        link: "https://www.mobileworld.com/new-phone-launch/",
        description: "The latest model surpasses all previous sales in its first week.",
        pubDate: "2025-04-10 16:15:00",
        image_url: "https://www.mobileworld.com/images/new_phone.jpg",
        source_name: "MobileWorld",
        language: "english",
        country: ["japan"],
        category: ["technology"],
        duplicate: true
    },
    {
        article_id: "i456edc789ujm123qaws",
        title: "Top 5 Online Courses to Boost Your Career in 2025",
        link: "https://www.edulearn.com/top-courses-2025/",
        description: "Learn skills that will be in demand over the next decade.",
        pubDate: "2025-04-09 08:25:00",
        image_url: "https://www.edulearn.com/images/top_courses.jpg",
        source_name: "EduLearn",
        language: "german",
        country: ["india"],
        category: ["education"],
        duplicate: false
    },
    {
        article_id: "j234mlk567poi890trew",
        title: "The Rise of Remote Work Culture Post-2025",
        link: "https://www.bizdaily.com/remote-work-2025/",
        description: "More companies are adopting hybrid and remote models.",
        pubDate: "2025-04-08 14:40:00",
        image_url: "https://www.bizdaily.com/images/remote_work.jpg",
        source_name: "BizDaily",
        language: "english",
        country: ["germany"],
        category: ["business"],
        duplicate: false
    },
    {
        article_id: "k098qaz765wsx432edcv",
        title: "Fashion Trends to Watch Out for in 2025",
        link: "https://www.stylemag.com/trends-2025/",
        description: "What’s hot and what’s not for the next fashion season.",
        pubDate: "2025-04-07 12:10:00",
        image_url: "https://www.stylemag.com/images/fashion2025.jpg",
        source_name: "StyleMag",
        language: "german",
        country: ["italy"],
        category: ["fashion"],
        duplicate: true
    }
];

function Analytics() {
    const [duplicateData, setDuplicateData] = useState([]);
    const [sourceData, setSourceData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [dateData, setDateData] = useState([]);
    const [languageData, setLanguageData] = useState([]);
    const [data] = useState(articles);

    const exportToCSV = () => {
        const headers = Object.keys(data[0]).join(",");
        const rows = data.map(article => {
          return Object.values(article)
            .map(value => {
              if (Array.isArray(value)) {
                return `"${value.join(", ")}"`; // join arrays
              }
              if (typeof value === "string" && value.includes(",")) {
                return `"${value}"`; // wrap strings with commas in quotes
              }
              return value;
            })
            .join(",");
        });

        const csvContent = [headers, ...rows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "articles.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };


    useEffect(() => {
        const duplicateCounts = {};
        const sourceCounts = {};
        const countryCounts = {};
        const categoryCounts = {};
        const dailyCounts = {};
        const languageCounts = {};

        articles.forEach((article) => {
            // Source totals
            const src = article.source_name || "Unknown";
            sourceCounts[src] = (sourceCounts[src] || 0) + 1;

            // Duplicates vs Originals by Source
            if (!duplicateCounts[src]) duplicateCounts[src] = { duplicates: 0, originals: 0 };
            if (article.duplicate) duplicateCounts[src].duplicates += 1;
            else duplicateCounts[src].originals += 1;

            // Country counts
            (article.country || []).forEach((c) => {
                countryCounts[c] = (countryCounts[c] || 0) + 1;
            });

            // Category counts
            (article.category || []).forEach((cat) => {
                categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            });

            const lang = article.language || "unknown";
            languageCounts[lang] = (languageCounts[lang] || 0) + 1;


            // Daily article counts
            const day = article.pubDate.substring(0, 10); // YYYY-MM-DD
            dailyCounts[day] = (dailyCounts[day] || 0) + 1;
        });
        const languageArray = Object.keys(languageCounts).map((lang) => ({
            language: lang,
            count: languageCounts[lang]
        }));

        setLanguageData(languageArray);



        setDuplicateData(
            Object.entries(duplicateCounts).map(([source, vals]) => ({ source_name: source, ...vals }))
        );
        setSourceData(
            Object.entries(sourceCounts).map(([source, count]) => ({ source_name: source, count }))
        );
        setCountryData(
            Object.entries(countryCounts).map(([country, count]) => ({ country, count }))
        );
        setCategoryData(
            Object.entries(categoryCounts).map(([category, count]) => ({ category, count }))
        );

        const sortedDays = Object.keys(dailyCounts).sort();
        setDateData(
            sortedDays.map((day) => ({ date: day, count: dailyCounts[day] }))
        );
    }, []);

    return (
        <div className="">
            <Header />
            <div className="px-4 flex-col flex justify-center items-center">

                <h1 className="text-3xl font-bold my-6">Analytics Dashboard</h1>

                {/* 1. Duplicate vs Original by Source */}
                <div className="flex flex-wrap">

                    <div className="my-8 flex flex-col justify-center items-center">
                        <h2 className="text-xl font-semibold mb-4">Duplicate vs Original Articles by Source</h2>
                        <BarChart width={600} height={320} data={duplicateData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="source_name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="duplicates" stackId="a" fill="#ff6361" />
                            <Bar dataKey="originals" stackId="a" fill="#58508d" />
                        </BarChart>
                    </div>

                    {/* 2. Articles by Source */}
                    <div className="my-8 flex flex-col justify-center items-center">
                        <h2 className="text-xl font-semibold mb-4">Total Articles by Source</h2>
                        <BarChart width={600} height={300} data={sourceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="source_name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </div>

                     {/* 5. Articles Over Time */}
                     <div className="my-8 flex flex-col justify-center items-center">
                        <h2 className="text-xl font-semibold mb-4">Daily Articles Published</h2>
                        <LineChart width={600} height={300} data={dateData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" />
                        </LineChart>
                    </div>

                    <div className="my-8 flex flex-col justify-center items-center">
                        <h2 className="text-xl font-semibold mb-4">Articles by Language</h2>
                        <PieChart width={600} height={400}>
                            <Pie
                                data={languageData}
                                dataKey="count"
                                nameKey="language"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
                                label
                            >
                                {languageData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>

                    {/* 3. Articles by Country */}
                    <div className="my-8 flex flex-col justify-center items-center">
                        <h2 className="text-xl font-semibold mb-4">Total Articles by Country</h2>
                        <BarChart width={600} height={300} data={countryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="country" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </div>

                    {/* 4. Articles by Category */}
                    <div className="my-8 flex flex-col justify-center items-center">
                        <h2 className="text-xl font-semibold mb-4">Total Articles by Category</h2>
                        <BarChart width={600} height={300} data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#ffc658" />
                        </BarChart>
                    </div>

                   
                </div>
            </div >

            <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Articles</h1>
        <button
          onClick={exportToCSV}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
        >
          Export to CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Source</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Country</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Language</th>
              <th className="py-3 px-6 text-left">Link</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {data.map((article) => (
              <tr key={article.article_id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{article.title}</td>
                <td className="py-3 px-6">{article.source_name}</td>
                <td className="py-3 px-6">{new Date(article.pubDate).toLocaleDateString()}</td>
                <td className="py-3 px-6">{article.country.join(", ")}</td>
                <td className="py-3 px-6">{article.category.join(", ")}</td>
                <td className="py-3 px-6 capitalize">{article.language}</td>
                <td className="py-3 px-6">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

        </div>
    );
}

export default Analytics;
