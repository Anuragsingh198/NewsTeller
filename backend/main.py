from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ← import this
from core.database import Base, engine
from routers import article, user

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",  # Frontend dev server (React/Vite/etc.)
    "http://127.0.0.1:3000",  # Another common localhost variation
    # Add any other origins you want to allow:
    # "https://yourfrontenddomain.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Origins allowed to access the backend
    allow_credentials=True,
    allow_methods=["*"],              # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],              # Allow all headers
)

# Database
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(article.router)
app.include_router(user.router)
# app.include_router(favourite.router)
