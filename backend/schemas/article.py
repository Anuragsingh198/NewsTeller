from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ArticleBase(BaseModel):
    article_id: str
    title: str
    link: str
    description: Optional[str]
    pubDate: datetime
    image_url: Optional[str]
    source_name: str
    language: str
    country: str
    category: str
    duplicate: bool

class ArticleCreate(ArticleBase):
    pass
class ArticleOut(ArticleBase):
    id: int
    class Config:
        orm_mode = True
