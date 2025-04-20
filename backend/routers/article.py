from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import article as schemas
from models import article as models
from core.database import SessionLocal
from typing import List
from services.newsapi import fetch_news_articles
from sqlalchemy.exc import SQLAlchemyError
# from apscheduler.schedulers.background import BackgroundScheduler
router = APIRouter(prefix="/articles", tags=["Articles"])

import logging
logger = logging.getLogger("uvicorn")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/fetch")
def fetch_and_store_articles(db: Session = Depends(get_db)):
    try:
        articles = db.query(models.Article).all()
        if not articles:
            raise  HTTPException(status_code=402, detail="no data found")
        return articles

    # except SQLAlchemyError as db_error:
    #     db.rollback()
    #     print("Database error:", db_error)
    #     raise HTTPException(status_code=500, detail="Database operation failed")

    except Exception as e:
        print("General error:", e)
        raise HTTPException(status_code=500, detail="An error occurred while fetching/storing articles")


@router.get("/fetch/{pageNo}")
def get_news_data(  pageNo:int ,  db:Session= Depends(get_db)):

    pagelimt = 9
    offset_limit =  (pageNo -1)*9
    articles =  db.query(models.Article).offset(offset_limit).limit(pagelimt).all()
    if not articles :
        raise HTTPException (status_code=404 , detail="articels not found")
    return  articles

# @router.get("/fetch/all", response_model=List[schemas.ArticleOut])
# def get_news_data(db: Session = Depends(get_db)):
#     logger.info("🚀 /topnews endpoint hit")
#     articles = db.query(models.Article).all()
#     logger.info(f"🔍 Retrieved articles: {articles}")
#     if not articles:
#         raise HTTPException(status_code=404, detail="Articles not found")  
#     return articles

@router.get("/topnews", response_model=List[schemas.ArticleOut])
def get_top_news(db: Session = Depends(get_db)):
    # logger.info("🚀 /topnews endpoint hit")
    top_articles = db.query(models.Article).filter_by(category="top").all()
    # logger.info(f"🔍 Retrieved articles: {top_articles}")
    if top_articles:
        return top_articles
    fallback_articles = db.query(models.Article).limit(10).all()
    if not fallback_articles:
        raise HTTPException(status_code=404, detail="No articles found")
    return fallback_articles

@router.get("/{article_id}", response_model=schemas.ArticleOut)
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter_by(id=article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article


