from  fastapi import  Depends , HTTPException , APIRouter
from schemas import  article as schema
from models  import article as model
from  sqlalchemy.orm import  Session
from core.database import SessionLocal

from sqlalchemy.exc import  SQLAlchemyError
from   typing import  List
routes = APIRouter("/analytics" , tags=["Analytics"])