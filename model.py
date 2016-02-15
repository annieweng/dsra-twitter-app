from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Date, Text, Float
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, backref
import config

########### SESSION ###########

engine = create_engine(config.DB_URI, echo=False)
session = scoped_session(sessionmaker(bind=engine, autocommit=False, autoflush=False))

########### END SESSION ###########


########### CLASS DEFINITIONS ###########

Base = declarative_base()
Base.query = session.query_property()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index=True)
    
    email = Column(String(128), nullable = True)
    password = Column(String(128), nullable = True)
    first_name = Column(String(64))
    last_name = Column(String(64))




########### END CLASS DEFINITIONS ###########


def create_tables():
    Base.metadata.create_all(engine)

def main():
    create_tables()

if __name__ == "__main__":
    main()
