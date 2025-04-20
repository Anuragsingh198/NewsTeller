from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from core.database import Base, engine, SessionLocal
from routers import article, user, favourite
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session
from services.newsapi import fetch_news_articles 
from models.article import Article  
from datetime import datetime, timedelta


app = FastAPI()

# CORS setup
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,
    allow_methods=["*"],              
    allow_headers=["*"],            
)
Base.metadata.create_all(bind=engine)
def fetch_and_store_articles_scheduled():
    db: Session = SessionLocal()
    try:
        articles = fetch_news_articles()
        for art in articles:
            if not db.query(Article).filter_by(article_id=art["article_id"]).first():
                db_article = Article(**art)
                db.add(db_article)
        db.commit()
        print("Scheduled fetch: Articles stored successfully.")
    except Exception as e:
        print("Scheduled fetch error:", e)
    finally:
        db.close()

scheduler = BackgroundScheduler()
scheduler.add_job(
    fetch_and_store_articles_scheduled,
    "interval",
    hours=24,
    next_run_time=datetime.now() + timedelta(hours=24)  
)
scheduler.start()

app.include_router(article.router)
app.include_router(user.router)
# app.include_router(favourite.router)
