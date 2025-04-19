from sqlalchemy import Column, String, Text, Integer, DateTime, Boolean
from core.database import Base

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(String, unique=True, index=True)
    title = Column(String)
    link = Column(String)
    description = Column(Text)
    pubDate = Column(DateTime)
    image_url = Column(String)
    source_name = Column(String)
    language = Column(String)
    country = Column(String)
    category = Column(String)
    duplicate = Column(Boolean)
