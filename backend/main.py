from fastapi import FastAPI
from core.database import Base, engine
from routers import article, user, favourite

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(article.router)
app.include_router(user.router)
app.include_router(favourite.router)
