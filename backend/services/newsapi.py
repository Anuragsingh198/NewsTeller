import requests
from datetime import datetime

def fetch_news_articles():
    url = "https://newsdata.io/api/1/latest?apikey=pub_810776c82eb0c7f268ca28bbc30fbd8bcb6f6"
    response = requests.get(url)
    data = response.json()
    articles = []
    # print("data is : " , data)
    for item in data.get("results", []):
        articles.append({
            "article_id": item["article_id"],
            "title": item["title"],
            "link": item["link"],
            "description": item["description"],
            "pubDate": datetime.strptime(item["pubDate"], "%Y-%m-%d %H:%M:%S"),
            "image_url": item["image_url"],
            "source_name": item["source_name"],
            "language": item["language"],
            "country": item["country"][0] if item["country"] else "",
            "category": item["category"][0] if item["category"] else "",
            "duplicate": item["duplicate"]
        })
        # print ("article  is : ",  articles)
    return articles

