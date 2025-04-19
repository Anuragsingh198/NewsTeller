from pydantic import BaseModel

class FavouriteCreate(BaseModel):
    user_id: int
    article_id: int

<<<<<<< HEAD

class FavouriteOut(FavouriteCreate):
    id: int
=======
class FavouriteOut(FavouriteCreate):
    id: int

>>>>>>> 8ea485269136fbb5e78652377b9ae1267320136c
    class Config:
        orm_mode = True
