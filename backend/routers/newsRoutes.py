from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from db.curd import get_Item, create_fake_data
from db.session import get_db
from db.base import News

router = APIRouter()


@router.get("/")
async def get_news(db: Session = Depends(get_db), search: str = Query(None)):
    query = db.query(News)
    if search:
        query = query.filter(News.title.ilike(f"%{search}%"))
    return query.all()


@router.get("/about")
async def about():
    return {"message": "we are in about page"}


@router.get("/populate")
def populate(db: Session = Depends(get_db)):
    return create_fake_data(db)
