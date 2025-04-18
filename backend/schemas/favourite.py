from pydantic import BaseModel

class FavouriteCreate(BaseModel):
    user_id: int
    article_id: int

class FavouriteOut(FavouriteCreate):
    id: int

    class Config:
        orm_mode = True
