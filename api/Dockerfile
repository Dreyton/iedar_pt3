FROM python:3.11.5-slim

RUN pip install --upgrade pip && \
  pip install --no-cache-dir fastapi uvicorn pandas mlxtend openpyxl python-multipart passlib SQLAlchemy psycopg2-binary pip install python-jose python-dotenv

RUN useradd -ms /bin/bash python

USER python

WORKDIR /home/python/app

COPY --chown=python:python . .

EXPOSE 8000

CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000" ]