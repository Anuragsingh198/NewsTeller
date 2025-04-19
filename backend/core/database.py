from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:newpassword@localhost:5432/news"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 8ea485269136fbb5e78652377b9ae1267320136c
=======
>>>>>>> a87b6be (addedArticle)
Base = declarative_base()
