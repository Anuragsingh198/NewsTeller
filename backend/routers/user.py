from fastapi import APIRouter, Depends , HTTPException ,status
from sqlalchemy.orm import Session
from core.database import SessionLocal
from models import user as models
from  schemas import user as schemas
from sqlalchemy.exc import IntegrityError
import hashlib

router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        hashed_pw = hashlib.sha256(user.password.encode()).hexdigest()
        db_user = models.User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_pw
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="User creation failed"
        )


@router.post("/login", response_model=schemas.UserOut)
def login(user: schemas.UserData, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter_by(email=user.email).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid email or password"
        )
    hashed_pw = hashlib.sha256(user.password.encode()).hexdigest()

    if hashed_pw != db_user.hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return db_user