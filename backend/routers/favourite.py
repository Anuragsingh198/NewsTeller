# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from core.database import SessionLocal
# from models import favourite as models
# from schemas import favourite as schemas

# router = APIRouter(prefix="/favourites", tags=["Favourites"])

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.post("/", response_model=schemas.FavouriteOut)
# def add_to_favourites(fav: schemas.FavouriteCreate, db: Session = Depends(get_db)):
#     db_fav = models.Favourite(**fav.dict())
#     db.add(db_fav)
#     db.commit()
#     db.refresh(db_fav)
#     return db_fav
