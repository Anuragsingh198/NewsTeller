from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import article as schemas
from models import article as models
from core.database import SessionLocal
from services.newsapi import fetch_news_articles
from sqlalchemy.exc import SQLAlchemyError
router = APIRouter(prefix="/articles", tags=["Articles"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/fetch")
def fetch_and_store_articles(db: Session = Depends(get_db)):
    try:
        articles = fetch_news_articles()
        for art in articles:
            if not db.query(models.Article).filter_by(article_id=art["article_id"]).first():
                db_article = models.Article(**art)
                db.add(db_article)
        db.commit()
        return {"message": "Articles stored successfully"}

    except SQLAlchemyError as db_error:
        db.rollback()
        print("Database error:", db_error)
        raise HTTPException(status_code=500, detail="Database operation failed")

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


@router.get("/{article_id}", response_model=schemas.ArticleOut)
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter_by(id=article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article


# @router.get("/{filter}")
# def get_filtered_data( filter :str ,  db:Session =  Depends(get_db)):
