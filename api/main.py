from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.infra.ormSqlAlchemy.helpers.connection import PgConnection
from src.infra.ormSqlAlchemy.entities.user import Base
from src.main.routes.base import api_router
from src.main.config.env import env

origins = [
    "http://localhost:3000",
]


def create_connection():
    engine = PgConnection.connection()
    Base.metadata.create_all(bind=engine)


def include_routes(app):
    app.include_router(api_router, prefix="/api/v1")


def start_app():
    app = FastAPI(title=env.PROJECT_NAME, version=env.PROJECT_VERSION)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    create_connection()
    include_routes(app)
    return app


app = start_app()


@app.get("/")
def home():
    return {"message": "Api is running🚀"}
