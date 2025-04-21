import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import context from "../context/contextProvider";
import { fetchAllNews } from "../context/contextAction";
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


function Analytics() {
    const [duplicateData, setDuplicateData] = useState([]);
    const [sourceData, setSourceData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [dateData, setDateData] = useState([]);
    const [languageData, setLanguageData] = useState([]);
    const [articles, setArticles] = useState([])
    const [data, setData] = useState(articles);
    const { allNews, dispatch } = useContext(context);

    useEffect(() => {
        dispatch({ type: "SET_LOADING", payload: true });
        fetchAllNews(dispatch)
            .then((data) => {
                setArticles(data)
                setData(data)
            })
            .finally(() => {
                dispatch({ type: "SET_LOADING", payload: false })
            })
    }, [dispatch])

    useEffect(() => {
        if (allNews) {
            setArticles(allNews);
            console.log('the all news in use effect is: ', allNews)
            console.log('the all data in use effect is: ', data)

        }
    }, [allNews]);

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

        articles?.forEach((article) => {
            // Source totals
            const src = article.source_name || "Unknown";
            sourceCounts[src] = (sourceCounts[src] || 0) + 1;

            // Duplicates vs Originals by Source
            if (!duplicateCounts[src]) duplicateCounts[src] = { duplicates: 0, originals: 0 };
            if (article.duplicate) duplicateCounts[src].duplicates += 1;
            else duplicateCounts[src].originals += 1;

            // Country counts
            const countries = Array.isArray(article.country) ? article.country : [article.country];
            countries.forEach((c) => {
                if (c) {
                    countryCounts[c] = (countryCounts[c] || 0) + 1;
                }
            });
            const categories = Array.isArray(article.category) ? article.category : [article.category];
            categories.forEach((cat) => {
                if (cat) {
                    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
                }
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
    }, [articles]);

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
                        <PieChart width={600} height={300}>
                            <Pie
                                data={languageData}
                                dataKey="count"
                                nameKey="language"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
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

                <div className="overflow-x-auto overflow-y-auto h-72 rounded-2xl">
                    <table className="min-w-full bg-white rounded-lg shadow">
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
                        <tbody className="text-gray-700 text-sm font-light ">
                            {data.map((article) => (
                                <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">{article.title}</td>
                                    <td className="py-3 px-6">{article.source_name}</td>
                                    <td className="py-3 px-6">{new Date(article.pubDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-6">
                                        {Array.isArray(article.country) ? article.country.join(", ") : article.country || "N/A"}
                                    </td>
                                    <td className="py-3 px-6">
                                        {Array.isArray(article.category) ? article.category.join(", ") : article.category || "N/A"}
                                    </td>

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
